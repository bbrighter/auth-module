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
			GetSettings: async () => ({ language, loadingMode }),
			PatchSettings: async (params: Partial<SettingsData>) =>
				console.log(params),
		}),
		useSettings: () => ({
			settings: { language, loadingMode },
			setSettings: console.log,
		}),
	};
}
