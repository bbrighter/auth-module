import { renderHook } from "@testing-library/react";
import { describe, expect, it, type Mock, vi } from "vitest";
import {
	useGetSettings,
	useSaveSettings,
	useSettings,
} from "../hooks/useSettings";
import { useAdapter } from "../useAdapter";
import {
	createMockSettingAdapter,
	mockGetSettings,
	mockPatchSettings,
	mockSetSettings,
} from "./mockAdapter";

vi.mock("../useAdapter");

describe("hooks", () => {
	it("useSettings", () => {
		const adapter = createMockSettingAdapter();
		(useAdapter as unknown as Mock).mockReturnValue(adapter);

		const { result } = renderHook(() => useSettings());
		expect(result.current.language).toBe("de-DE");
		expect(result.current.loadingMode).toBe("spinner");
	});

	it("useGetSettings", async () => {
		mockGetSettings.mockResolvedValue({
			language: "en-EN",
			loadingMode: "none",
		});
		const adapter = createMockSettingAdapter();
		(useAdapter as unknown as Mock).mockReturnValue(adapter);

		const { result } = renderHook(() => useGetSettings());
		await result.current();

		expect(mockGetSettings).toHaveBeenCalledOnce();
		expect(mockSetSettings).toHaveBeenCalledExactlyOnceWith({
			language: "en-EN",
			loadingMode: "none",
		});
	});

	it("useSaveSettings", async () => {
		const adapter = createMockSettingAdapter();
		(useAdapter as unknown as Mock).mockReturnValue(adapter);

		const { result } = renderHook(() => useSaveSettings());
		await result.current({ language: "fr-FR" });

		expect(mockPatchSettings).toHaveBeenCalledExactlyOnceWith({
			language: "fr-FR",
		});
		expect(mockSetSettings).toHaveBeenCalledExactlyOnceWith({
			language: "fr-FR",
			loadingMode: "spinner",
		});
	});
});
