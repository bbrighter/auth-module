import { createContext, useContext } from "react";
import type { Translate } from "./types";

export const TranslationContext = createContext<Translate | null>(null);

export const useAdapter = (): Translate | null => {
	const ctx = useContext(TranslationContext);

	return ctx;
};
