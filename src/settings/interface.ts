/** biome-ignore-all lint/suspicious/noConsole:  Log to console in case not set is okay*/

export type SettingsData = {
	language: string;
	loadingMode: string;
};

export interface SettingsApi {
	GetUserSettings: () => Promise<SettingsData>;
	PatchUserSettings: (settings: Partial<SettingsData>) => Promise<void>;
}

type Language = {
	value: string;
	label: string;
};

export interface SettingsStateAdapter {
	useSettingsApi(): SettingsApi | null;
	useSettings(): {
		settings: SettingsData;
		setSettings: (_: Partial<SettingsData>) => void;
		availableLanguages: Language[];
	};
}

export const defaultAdapter: SettingsStateAdapter = {
	useSettingsApi: () => null,
	useSettings: () => ({
		settings: { language: "de-DE", loadingMode: "spinner" },
		setSettings: () => console.log("not init"),
		availableLanguages: [{ label: "Deutsch", value: "de-DE" }],
	}),
};
