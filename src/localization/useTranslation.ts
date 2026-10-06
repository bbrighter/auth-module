import { useAdapter } from "./context";
import type { TranslationKey } from "./types";

export const useTranslation = () => {
	const t = useAdapter();

	return t !== null ? t : (key: TranslationKey) => key;
};
