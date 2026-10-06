import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserInviteView } from "../Invite/UserInviteView";
import { getInviteButton, getUserNameInput, inviteUser } from "./selectors";

describe("UserInvite component", () => {
	const mockInviteUser = vi.fn();

	it("User can be invited", async () => {
		mockInviteUser.mockResolvedValue(1);

		render(<UserInviteView inviteUser={mockInviteUser} />);

		await inviteUser("New user");

		expect(mockInviteUser).toHaveBeenCalledExactlyOnceWith({
			userName: "New user",
		});
	});

	it("Loading state", async () => {
		let resolveInvite!: (value: number) => void;

		mockInviteUser.mockImplementation(
			() =>
				new Promise<number>((resolve) => {
					resolveInvite = resolve;
				}),
		);

		render(<UserInviteView inviteUser={mockInviteUser} />);

		await inviteUser("New user");
		const inviteButton = getInviteButton();
		expect(inviteButton).toHaveClass("MuiButton-loading");

		resolveInvite(1);
		await waitFor(() => {
			expect(inviteButton).not.toHaveClass("MuiButton-loading");
		});
	});

	it("404 shows that user doesn't exist", async () => {
		mockInviteUser.mockReturnValue(404);

		render(<UserInviteView inviteUser={mockInviteUser} />);

		await inviteUser("New user");

		expect(screen.getByText("Nutzer existiert nicht")).toBeInTheDocument();
		expect(getUserNameInput().parentElement).toHaveClass("Mui-error");
	});
});
