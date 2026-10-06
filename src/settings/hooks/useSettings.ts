import type { SettingsData } from "../interface";
import { useAdapter } from "../useAdapter";

export const useSettings = () => {
	const adapter = useAdapter();
	const { settings } = adapter.useSettings();

	return settings;
};

export const useGetSettings = () => {
	const adapter = useAdapter();
	const { setSettings } = adapter.useSettings();
	const api = adapter.useSettingsApi();
	if (!api) throw "Api is not defined";

	const { GetUserSettings: GetSettings } = api;

	return async () => {
		const settings = await GetSettings();
		setSettings(settings);
	};
};

export const useSaveSettings = () => {
	const adapter = useAdapter();
	const { settings, setSettings } = adapter.useSettings();
	const api = adapter.useSettingsApi();
	if (!api) throw "Api is not defined";

	const { PatchUserSettings: PatchSettings } = api;

	return async (updates: Partial<SettingsData>) => {
		await PatchSettings(updates);
		setSettings(Object.assign(settings, updates));
	};
};
