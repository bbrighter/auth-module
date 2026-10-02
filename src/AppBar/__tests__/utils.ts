import { screen } from "@testing-library/react";

export const getLoadingModeCheckbox = () =>
	screen.getByRole("checkbox", {
		name: "Ladeanimationen",
	});

export const getSaveButton = () =>
	screen.getByRole("button", { name: "Speichern" });

export const getLanguageSelect = () => screen.getByRole("combobox");
