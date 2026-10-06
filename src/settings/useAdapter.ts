import { createContext, useContext } from "react";

import { defaultAdapter, type SettingsStateAdapter } from "./interface";

export const AdapterContext =
	createContext<SettingsStateAdapter>(defaultAdapter);

export const useAdapter = (): SettingsStateAdapter => {
	const ctx = useContext(AdapterContext);

	return ctx;
};
