import {
	useGetSettings,
	useSettings as useHookSettings,
	useSaveSettings,
} from "./hooks/useSettings";

export const useSettings = () => {
	const settings = useHookSettings();
	const getSettings = useGetSettings();
	const saveSettings = useSaveSettings();

	return { settings, getSettings, saveSettings };
};
