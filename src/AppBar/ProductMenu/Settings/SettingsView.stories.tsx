import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import type { SettingsData } from "../../../settings/interface";
import { type SettingsProps, SettingsView } from "./SettingsView";

const defaultSettings: SettingsProps = {
	availableLanguages: [{ value: "de-DE", label: "Deutsch" }],
	language: "de-DE",
	loadingMode: "spinner",
	saveSettings: async (s: Partial<SettingsData>) => console.log(s),
};

const SettingsDialogWithButton = (p: Partial<SettingsProps> = {}) => (
	<Paper sx={{ position: "absolute", left: "50%" }}>
		<MenuList>
			<SettingsView {...defaultSettings} {...p} />
		</MenuList>
	</Paper>
);

export const SettingsDialog_default = () => <SettingsDialogWithButton />;

export const SettingsDialog_multipleLanguages = () => (
	<SettingsDialogWithButton
		availableLanguages={[
			{ value: "de-DE", label: "Deutsch" },
			{ value: "fr-FR", label: "Francaise" },
			{ value: "en-US", label: "Englisch" },
		]}
	/>
);

export const SettingsDialog_noSpinner = () => (
	<SettingsDialogWithButton loadingMode="none" />
);
