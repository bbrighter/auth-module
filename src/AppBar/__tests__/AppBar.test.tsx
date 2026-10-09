import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuth } from "../../auth";
import { useSettings } from "../../settings";
import { useUserMgmt } from "../../users";
import { CustomAppBar } from "../AppBar";
import {
	findAndOpenAvatarMenu,
	getLanguageSelect,
	getLoadingModeCheckbox,
	getLogoutEntry,
	getProductSwitchEntry,
	getSaveButton,
	getUserSettingsEntry,
	openProductSwitch,
	openUserManagement,
	openUserSettings,
} from "./utils";

const mockLogout = vi.fn();
const saveSettings = vi.fn();

const defaultMockUseAuth: ReturnType<typeof useAuth> = {
	userName: "user 1",
	logout: mockLogout,
	token: "token",
	permissions: [
		{
			id: "123",
			productId: "shopping-list",
			productName: "Einkaufsliste",
			url: "url1",
		},
		{
			id: "ABC",
			productId: "hista-complete",
			productName: "Hista",
			url: "url2",
		},
	],
	activeInstance: { id: "1", productId: "", productName: "", url: "" },
	login: vi.fn(),
	navigate: vi.fn(),
	piid: "",
	setPermissions: vi.fn(),
	isLoaded: true,
};

const defaultMockUseSettings: ReturnType<typeof useSettings> = {
	settings: {
		language: "de-DE",
		loadingMode: "spinner",
	},
	getSettings: vi.fn(),
	saveSettings: saveSettings,
	availableLanguages: [{ label: "Deutsch", value: "de-DE" }],
};

const defaultMockUseUserMgmt: ReturnType<typeof useUserMgmt> = {
	users: [],
	avatarProps: vi.fn(),
	setUsers: vi.fn(),
	deleteUser: vi.fn(),
	inviteUser: vi.fn(),
};

vi.mock("../../auth", () => ({ useAuth: vi.fn() }));
vi.mock("../../settings", () => ({ useSettings: vi.fn() }));
vi.mock("../../users", () => ({ useUserMgmt: vi.fn() }));

describe("app bar", () => {
	beforeEach(() => {
		vi.mocked(useAuth).mockReturnValue(defaultMockUseAuth);
		vi.mocked(useSettings).mockReturnValue(defaultMockUseSettings);
		vi.mocked(useUserMgmt).mockReturnValue(defaultMockUseUserMgmt);
	});

	it("renders", async () => {
		render(<CustomAppBar />);

		await findAndOpenAvatarMenu("U1");
		getProductSwitchEntry();
		getLogoutEntry();
		getUserSettingsEntry();
	});

	describe("logout", () => {
		it("ok", async () => {
			render(<CustomAppBar />);

			await findAndOpenAvatarMenu("U1");

			const logoutButton = getLogoutEntry();
			await userEvent.click(logoutButton);
			expect(mockLogout).toHaveBeenCalled();
		});

		it("no token", async () => {
			vi.mocked(useAuth).mockReturnValue({
				...defaultMockUseAuth,
				token: "",
			});

			render(<CustomAppBar />);

			await findAndOpenAvatarMenu("U1");

			const logoutButton = screen
				.getByText("Logout")
				.closest("li") as HTMLElement;
			expect(logoutButton).toHaveAttribute("aria-disabled", "true");
		});
	});

	it("open user management", async () => {
		render(<CustomAppBar />);

		await findAndOpenAvatarMenu("U1");

		await openUserManagement();
		expect(screen.getByText("Nutzerverwaltung")).toBeInTheDocument();
	});

	it("change product instance", async () => {
		render(<CustomAppBar />);

		await findAndOpenAvatarMenu("U1");

		await openProductSwitch();

		const shoppingList = screen.getByText("Einkaufsliste");
		expect(shoppingList).toBeInTheDocument();
		const shoppingListLink = shoppingList.closest("a") as HTMLElement;
		expect(shoppingListLink).toHaveAttribute("href", "url1/123");

		const hista = screen.getByText("Hista");
		expect(hista).toBeInTheDocument();
		const histaLink = hista.closest("a") as HTMLElement;
		expect(histaLink).toHaveAttribute("href", "url2/ABC");
	});

	it("children are rendered", async () => {
		render(
			<CustomAppBar>
				<div>Hello</div>
			</CustomAppBar>,
		);

		expect(await screen.findByText("Hello")).toBeInTheDocument();
	});

	it("Open and edit settings", async () => {
		render(<CustomAppBar />);

		await findAndOpenAvatarMenu("U1");

		await openUserSettings();
		screen.getByRole("dialog");
		await userEvent.click(getLoadingModeCheckbox());
		getLanguageSelect();
		await userEvent.click(getSaveButton());
		expect(saveSettings).toHaveBeenCalledExactlyOnceWith({
			language: "de-DE",
			loadingMode: "none",
		});
	});
});
