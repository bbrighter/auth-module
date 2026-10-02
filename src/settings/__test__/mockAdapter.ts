import { vi } from "vitest";

import type { SettingsApi, SettingsStateAdapter } from "../interface";

export const createMockSettingsApi = (
	overrides?: Partial<SettingsApi>,
): SettingsApi => ({
	GetSettings: vi.fn(),
	PatchSettings: vi.fn(),
	...overrides,
});

export const createMockSettingAdapter = (
	overrides?: Partial<SettingsStateAdapter>,
): SettingsStateAdapter => ({
	useSettingsApi: () => createMockSettingsApi(),
	useSettings: () => ({
		settings: { language: "de-DE", loadingMode: "spinner" },
		setSettings: vi.fn(),
	}),
	...overrides,
});
