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
			GetSettings: async () => ({ language, loadingMode }),
			PatchSettings: async (_params: Partial<SettingsData>) => {},
		}),
		useSettings: () => ({
			settings: { language, loadingMode },
			setSettings: console.log,
		}),
	};
}
