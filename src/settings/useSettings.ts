import {
	useAvailableLanguages,
	useGetSettings,
	useSettings as useHookSettings,
	useSaveSettings,
} from "./hooks/useSettings";

export const useSettings = () => {
	const settings = useHookSettings();
	const getSettings = useGetSettings();
	const saveSettings = useSaveSettings();
	const availableLanguages = useAvailableLanguages();

	return { settings, getSettings, saveSettings, availableLanguages };
};
