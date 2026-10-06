import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const findAndOpenAvatarMenu = async (name: string) => {
	const avatarMenu = await screen.findByText(name);
	await userEvent.click(avatarMenu);
};

export const getLoadingModeCheckbox = () =>
	screen.getByRole("checkbox", {
		name: "Ladeanimationen",
	});

export const getSaveButton = () =>
	screen.getByRole("button", { name: "Speichern" });

export const getLanguageSelect = () => screen.getByRole("combobox");

export const getProductSwitchEntry = () =>
	screen.getByRole("menuitem", { name: "Produkte" });

export const openProductSwitch = async () => {
	const productMenu = getProductSwitchEntry();
	await userEvent.click(productMenu);
};

export const getLogoutEntry = () =>
	screen.getByRole("menuitem", { name: "Logout" });

export const getUserSettingsEntry = () =>
	screen.getByRole("menuitem", { name: "Einstellungen" });

export const openUserSettings = async () => {
	await userEvent.click(getUserSettingsEntry());
};

export const openUserManagement = async () => {
	const userMgmt = screen.getByRole("menuitem", { name: "Benutzer" });
	await userEvent.click(userMgmt);
};
