import type { ReactNode } from "react";
import { TranslationContext } from "./context";
import type { Translate } from "./types";

export const LocalizationProvider = ({
	adapter,
	children,
}: {
	adapter?: Translate;
	children: ReactNode;
}) => {
	return (
		<TranslationContext.Provider value={adapter ?? null}>
			{children}
		</TranslationContext.Provider>
	);
};
