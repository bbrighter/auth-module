import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const getUserNameInput = () =>
	screen.getByRole("textbox", { name: "Nutzer einladen" });

export const getInviteButton = () =>
	screen.getByRole("button", { name: "Einladen" });

export const inviteUser = async (name: string) => {
	const input = getUserNameInput();
	await userEvent.type(input, name);
	await userEvent.click(getInviteButton());
};

export const getDeleteUser = (parent?: HTMLElement) => {
	const container = parent ? within(parent) : screen;
	return container.getByRole("button", { name: "Löschen" });
};

export const deleteUserByName = async (name: string) => {
	const userRow = screen.getByText(name).closest("li") as HTMLElement;
	if (!userRow) throw "no user row found";
	const deleteButton = getDeleteUser(userRow);
	await userEvent.click(deleteButton);
};
