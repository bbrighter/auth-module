import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SettingsData, SettingsStateAdapter } from "../interface";
import { SettingsProvider } from "../SettingsProvider";

describe("SettingsProvider", () => {
	const settings = { language: "de-DE", loadingMode: "spinner" };
	const getUserSettings = vi.fn();
	const setSettings = vi.fn();

	const adapter: SettingsStateAdapter = {
		useSettings: () => ({
			settings: settings,
			setSettings: setSettings,
			availableLanguages: [{ label: "Deutsch", value: "de-DE" }],
		}),
		useSettingsApi: () => ({
			GetUserSettings: getUserSettings,
			PatchUserSettings: vi.fn(),
		}),
	};

	it("Settings component calls API", async () => {
		getUserSettings.mockResolvedValue(settings satisfies SettingsData);
		render(<SettingsProvider adapter={adapter}>Hello</SettingsProvider>);

		await waitFor(() => {
			expect(getUserSettings).toHaveBeenCalledOnce();
			expect(setSettings).toHaveBeenCalledExactlyOnceWith(settings);
		});
	});

	it("Doesn't call API twice", async () => {
		getUserSettings.mockResolvedValue(settings satisfies SettingsData);

		const { rerender } = render(
			<SettingsProvider adapter={adapter}>Hello</SettingsProvider>,
		);
		rerender(<SettingsProvider adapter={adapter}>Hello</SettingsProvider>);

		await waitFor(() => {
			expect(getUserSettings).toHaveBeenCalledOnce();
		});
	});

	it("Not initialized on error", async () => {
		getUserSettings.mockRejectedValueOnce(new Error("Unauthorized"));

		const { rerender } = render(
			<SettingsProvider adapter={adapter}>Hello</SettingsProvider>,
		);

		await waitFor(() => {
			expect(getUserSettings).toHaveBeenCalledOnce();
			expect(setSettings).not.toHaveBeenCalled();
		});

		getUserSettings.mockResolvedValue(settings satisfies SettingsData);
		rerender(<SettingsProvider adapter={adapter}>Hello</SettingsProvider>);
		await waitFor(() => {
			expect(getUserSettings).toHaveBeenCalledTimes(2);
			expect(setSettings).toHaveBeenCalledOnce();
		});
	});
});
