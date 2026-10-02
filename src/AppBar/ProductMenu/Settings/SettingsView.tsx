import { MenuItem } from "@mui/material";
import { useState } from "react";
import type { SettingsData } from "../../../settings/interface";
import { SettingsDialog } from "./SettingsDialog";

export type SettingsProps = {
	language: string;
	loadingMode: string;
	saveSettings: (s: Partial<SettingsData>) => Promise<void>;
	availableLanguages: Array<{ value: string; label: string }>;
};

export const SettingsView = ({
	language,
	availableLanguages,
	loadingMode,
	saveSettings,
}: SettingsProps) => {
	const [open, setOpen] = useState(false);
	const onClose = () => setOpen(false);

	return (
		<>
			<MenuItem onClick={() => setOpen(true)}>Einstellungen</MenuItem>
			<SettingsDialog
				language={language}
				loadingMode={loadingMode}
				saveSettings={saveSettings}
				availableLanguages={availableLanguages}
				open={open}
				onClose={onClose}
			/>
		</>
	);
};
