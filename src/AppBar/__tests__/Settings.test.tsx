import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	SettingsDialogView,
	type SettingsProps,
} from "../ProductMenu/Settings/SettingsView";
import {
	getLanguageSelect,
	getLoadingModeCheckbox,
	getSaveButton,
} from "./utils";

describe("SettingsDialog component", () => {
	const onSave = vi.fn();
	const renderDialog = (override: Partial<SettingsProps> = {}) =>
		render(
			<SettingsDialogView
				language={"de-DE"}
				loadingMode={"spinner"}
				saveSettings={onSave}
				availableLanguages={[{ value: "de-DE", label: "Deutsch" }]}
				{...override}
			/>,
		);
	it("Renders", () => {
		renderDialog();

		screen.getByText("Benutzereinstellungen");
		expect(getSaveButton()).toBeInTheDocument();
		expect(getLoadingModeCheckbox()).toBeInTheDocument();
		expect(getLanguageSelect()).toBeInTheDocument();
	});

	it("Uncheck and save", async () => {
		renderDialog({ loadingMode: "spinner" });

		const checkbox = getLoadingModeCheckbox();
		expect(checkbox).toBeChecked();
		await userEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();

		await userEvent.click(getSaveButton());
		expect(onSave).toHaveBeenCalledExactlyOnceWith({
			language: "de-DE",
			loadingMode: "none",
		});
	});

	it("Change language and save", async () => {
		renderDialog({
			language: "de-DE",
			availableLanguages: [
				{ value: "de-DE", label: "Deutsch" },
				{ value: "en-US", label: "English" },
			],
		});

		const languageSelect = getLanguageSelect();
		expect(languageSelect).toHaveTextContent("Deutsch");

		await userEvent.click(languageSelect);
		const english = screen.getByRole("option", { name: "English" });
		await userEvent.click(english);

		await userEvent.click(getSaveButton());
		expect(onSave).toHaveBeenCalledExactlyOnceWith({
			language: "en-US",
			loadingMode: "spinner",
		});
	});
});
