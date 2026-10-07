/** biome-ignore-all lint/suspicious/noConsole: Used for ladle only */
import type { SettingsData, SettingsStateAdapter } from "../settings/interface";

export type SettingsTestOptions = {
	language?: string;
	loadingMode?: string;
};

export function createSettingsAdapter(
	options: SettingsTestOptions = {},
): SettingsStateAdapter {
	const { language = "de-DE", loadingMode = "spinner" } = options;

	return {
		useSettingsApi: () => ({
			GetUserSettings: async () => ({ language, loadingMode }),
			PatchUserSettings: async (params: Partial<SettingsData>) =>
				console.log(params),
		}),
		useSettings: () => ({
			settings: { language, loadingMode },
			setSettings: console.log,
			availableLanguages: [
				{ label: "Deutsch", value: "de-DE" },
				{ label: "English", value: "en-US" },
			],
		}),
	};
}
