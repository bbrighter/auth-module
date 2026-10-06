import { vi } from "vitest";

import type { SettingsApi, SettingsStateAdapter } from "../interface";

export const mockGetSettings = vi.fn();
export const mockSetSettings = vi.fn();
export const mockPatchSettings = vi.fn();

const createMockSettingsApi = (
	overrides?: Partial<SettingsApi>,
): SettingsApi => ({
	GetUserSettings: mockGetSettings,
	PatchUserSettings: mockPatchSettings,
	...overrides,
});

export const createMockSettingAdapter = (
	overrides?: Partial<SettingsStateAdapter>,
): SettingsStateAdapter => {
	const settingsApi = createMockSettingsApi();

	return {
		useSettingsApi: () => settingsApi,
		useSettings: () => ({
			settings: { language: "de-DE", loadingMode: "spinner" },
			setSettings: mockSetSettings,
		}),
		...overrides,
	};
};
