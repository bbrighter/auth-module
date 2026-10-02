import type { ReactNode } from "react";
import type { SettingsStateAdapter } from "./interface";
import { AdapterContext } from "./useAdapter";

export function SettingsProvider({
	adapter,
	children,
}: {
	adapter: SettingsStateAdapter;
	children: ReactNode;
}) {
	return (
		<AdapterContext.Provider value={adapter}>
			{children}
		</AdapterContext.Provider>
	);
}
