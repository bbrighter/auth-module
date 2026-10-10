import { type ReactNode, useEffect, useRef } from "react";
import type { SettingsStateAdapter } from "./interface";
import { AdapterContext } from "./useAdapter";

export function SettingsProvider({
	adapter,
	children,
}: {
	adapter: SettingsStateAdapter;
	children: ReactNode;
}) {
	const api = adapter.useSettingsApi();
	const { setSettings } = adapter.useSettings();
	const initialized = useRef(false);

	useEffect(() => {
		if (api === null || initialized.current) {
			return;
		}
		initialized.current = true;
		api
			.GetUserSettings()
			.then((resp) => setSettings(resp))
			.catch(() => {
				initialized.current = false;
			});
	}, [api, setSettings]);

	return (
		<AdapterContext.Provider value={adapter}>
			{children}
		</AdapterContext.Provider>
	);
}
