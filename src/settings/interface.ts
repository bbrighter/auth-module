/** biome-ignore-all lint/suspicious/noConsole:  Log to console in case not set is okay*/

export type SettingsData = {
	language: string;
	loadingMode: string;
};

export interface SettingsApi {
	GetSettings: () => Promise<SettingsData>;
	PatchSettings: (settings: Partial<SettingsData>) => Promise<void>;
}

export interface SettingsStateAdapter {
	useSettingsApi(): SettingsApi | null;
	useSettings(): {
		settings: SettingsData;
		setSettings: (_: Partial<SettingsData>) => void;
	};
}

export const defaultAdapter: SettingsStateAdapter = {
	useSettingsApi: () => null,
	useSettings: () => ({
		settings: { language: "de-DE", loadingMode: "spinner" },
		setSettings: () => console.log("not init"),
	}),
};
