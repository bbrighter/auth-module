import Menu from "@mui/material/Menu";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LogoutView } from "../ProductMenu/Logout/LogoutView";
import { getLogoutEntry } from "./selectors";

describe("LogoutMenuEntry", () => {
	const logout = vi.fn();
	const renderEntry = (token: string) =>
		render(
			<Menu open disableRestoreFocus>
				<LogoutView logout={logout} token={token} />
			</Menu>,
		);

	it("Logout possible if logged in", async () => {
		renderEntry("token");

		const logoutEntry = getLogoutEntry();
		expect(logoutEntry).toBeEnabled();

		await userEvent.click(logoutEntry);
		expect(logout).toHaveBeenCalledOnce();
	});

	it("Logout not possible if no token exists", () => {
		renderEntry("");

		const logoutEntry = getLogoutEntry();
		expect(logoutEntry).toHaveAttribute("aria-disabled", "true");
	});
});
