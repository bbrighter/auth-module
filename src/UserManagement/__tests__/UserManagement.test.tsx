import { render, screen, waitFor } from "@testing-library/react";
import { type ReactNode, useState } from "react";
import { describe, expect, it, vi } from "vitest";

import type { UserAPI, UserStateAdapter } from "../../users/interface";
import { UserManagementProvider } from "../../users/UserManagementProvider";
import { UserManagement } from "../UserManagement";
import { deleteUserByName, getDeleteUser, inviteUser } from "./selectors";

const useMockAdapter = (apiOverrides?: Partial<UserAPI>) => {
	const [users, setUsers] = useState([
		{ name: "name", id: "123" },
		{ name: "not me", id: "ABC" },
	]);
	const mockApi: UserAPI = {
		AddUserToProductInstance: vi.fn().mockResolvedValue({ id: "999" }),
		GetUsersForProductInstance: vi.fn().mockResolvedValue({ users }),
		RemoveUserFromProductInstance: vi.fn(),
	};

	const api = { ...mockApi, ...apiOverrides };

	const adapter: UserStateAdapter = {
		useApi: () => api,
		useUsers: () => ({ users, setUsers }),
		usePiid: vi.fn(),
	};

	return adapter;
};

const TestWrapper = ({
	children,
	apiOverrides,
}: {
	children: ReactNode;
	apiOverrides?: Partial<UserAPI>;
}) => {
	const adapter = useMockAdapter(apiOverrides);
	return (
		<UserManagementProvider adapter={adapter}>
			{children}
		</UserManagementProvider>
	);
};

describe("user management", () => {
	it("renders", async () => {
		render(
			<TestWrapper>
				<UserManagement currentUserName="name" />
			</TestWrapper>,
		);

		expect(await screen.findByText("Nutzerverwaltung")).toBeInTheDocument();
	});

	it("delete", async () => {
		render(
			<TestWrapper>
				<UserManagement currentUserName="name" />
			</TestWrapper>,
		);

		await waitFor(async () => await deleteUserByName("not me"));
		await waitFor(() => {
			expect(screen.queryByText("not me")).not.toBeInTheDocument();
		});
	});

	it("delete myself not possible", async () => {
		render(
			<TestWrapper>
				<UserManagement currentUserName="name" />
			</TestWrapper>,
		);

		const user = await screen.findByText("name");
		expect(user).toBeInTheDocument();
		const userRow = user.closest("li") as HTMLElement;
		const userDeleteButton = getDeleteUser(userRow);
		expect(userDeleteButton).toBeInTheDocument();
		expect(userDeleteButton).toBeDisabled();
	});

	it("invite", async () => {
		render(
			<TestWrapper>
				<UserManagement currentUserName="name" />
			</TestWrapper>,
		);

		await inviteUser("new user");
		expect(screen.getAllByRole("listitem")).toHaveLength(3);
	});

	it("invite, but not found", async () => {
		render(
			<TestWrapper
				apiOverrides={{
					AddUserToProductInstance: vi.fn().mockRejectedValue({ status: 404 }),
				}}
			>
				{" "}
				<UserManagement currentUserName="name" />
			</TestWrapper>,
		);

		await inviteUser("new user");

		expect(screen.getAllByRole("listitem")).toHaveLength(2);
		expect(screen.getByText("Nutzer existiert nicht")).toBeInTheDocument();
	});
});
