import { createContext, useContext } from "react";
import type { Translate } from "./types";

export const TranslationContext = createContext<Translate | null>(null);

export const useAdapter = (): Translate => {
	const ctx = useContext(TranslationContext);
	if (!ctx) throw new Error("TranslationContext missing");

	return ctx;
};
