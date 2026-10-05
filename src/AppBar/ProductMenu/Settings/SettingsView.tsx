import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTranslation } from "../../../localization/useTranslation";
import type { SettingsData } from "../../../settings/interface";

export type SettingsProps = {
	language: string;
	loadingMode: string;
	saveSettings: (s: Partial<SettingsData>) => Promise<void>;
	availableLanguages: Array<{ value: string; label: string }>;
};

export const SettingsDialogView = ({
	availableLanguages,
	language,
	loadingMode,
	saveSettings,
}: SettingsProps) => {
	const t = useTranslation();

	const [selectedLanguage, setSelectedLanguage] = useState(language);
	const [selectedLoadingMode, setSelectedLoadingMode] = useState(loadingMode);

	const animations = selectedLoadingMode === "spinner";

	const onToggleCheckbox = () =>
		setSelectedLoadingMode(
			selectedLoadingMode === "spinner" ? "none" : "spinner",
		);

	const onSave = async () => {
		await saveSettings({
			language: selectedLanguage,
			loadingMode: selectedLoadingMode,
		});
	};

	return (
		<Box>
			<DialogTitle>{t("Benutzereinstellungen")}</DialogTitle>
			<Stack spacing={1} sx={{ padding: 4 }}>
				<FormControlLabel
					control={
						<Checkbox checked={animations} onChange={onToggleCheckbox} />
					}
					label="Ladeanimationen"
				/>
				<Select
					label="Sprache"
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
				>
					{availableLanguages.map((l) => (
						<MenuItem value={l.value} key={l.value}>
							{l.label}
						</MenuItem>
					))}
				</Select>
			</Stack>
			<Button onClick={onSave}>Speichern</Button>
		</Box>
	);
};
