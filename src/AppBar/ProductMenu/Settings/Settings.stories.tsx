import Paper from "@mui/material/Paper";
import type { SettingsData } from "../../../settings/interface";
import { SettingsDialogView, type SettingsProps } from "./SettingsView";

const defaultSettings: SettingsProps = {
	availableLanguages: [{ value: "de-DE", label: "Deutsch" }],
	language: "de-DE",
	loadingMode: "spinner",
	// biome-ignore lint/suspicious/noConsole: Only default
	saveSettings: async (s: Partial<SettingsData>) => console.log(s),
};

const SettingsWithButton = (p: Partial<SettingsProps> = {}) => (
	<Paper sx={{ position: "absolute", left: "50%" }}>
		<SettingsDialogView {...defaultSettings} {...p} />
	</Paper>
);

export const Settings_multipleLanguages = () => (
	<SettingsWithButton
		availableLanguages={[
			{ value: "de-DE", label: "Deutsch" },
			{ value: "fr-FR", label: "Francaise" },
			{ value: "en-US", label: "Englisch" },
		]}
	/>
);
