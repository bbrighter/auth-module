import { Dialog, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "../../../localization/useTranslation";
import { useSettings } from "../../../settings";
import type { SettingsData } from "../../../settings/interface";
import { SettingsDialogView } from "./SettingsView";

export const Settings = () => {
	const t = useTranslation();
	const { settings, saveSettings } = useSettings();
	const [open, setOpen] = useState(false);
	const availableLanguages = [{ value: "de-DE", label: "Deutsch" }];

	const onSave = async (s: Partial<SettingsData>) => {
		await saveSettings(s);
		setOpen(false);
	};

	return (
		<>
			<MenuItem onClick={() => setOpen(true)}>{t("Einstellungen")}</MenuItem>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<SettingsDialogView
					language={settings.language}
					availableLanguages={availableLanguages}
					loadingMode={settings.loadingMode}
					saveSettings={onSave}
				/>
			</Dialog>
		</>
	);
};
