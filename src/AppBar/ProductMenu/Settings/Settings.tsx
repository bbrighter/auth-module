import { useSettings } from "../../../settings";
import { SettingsView } from "./SettingsView";

export const Settings = () => {
	const { settings, saveSettings } = useSettings();
	const availableLanguages = [{ value: "de-DE", label: "Deutsch" }];

	return (
		<SettingsView
			language={settings.language}
			availableLanguages={availableLanguages}
			loadingMode={settings.loadingMode}
			saveSettings={saveSettings}
		/>
	);
};
