import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const getProductMenu = () =>
	screen.getByRole("menuitem", { name: "Produkte" });

export const openProductMenu = async () => {
	const productMenu = getProductMenu();
	await userEvent.click(productMenu);
};

export const getLogoutEntry = () =>
	screen.getByRole("menuitem", { name: "Logout" });
