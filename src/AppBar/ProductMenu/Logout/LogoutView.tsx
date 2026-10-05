import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "../../../localization/useTranslation";

type LogoutProps = {
	token: string;
	logout: () => void;
};

export function LogoutView({ token, logout }: LogoutProps) {
	const t = useTranslation();
	return (
		<MenuItem onClick={logout} disabled={token === ""}>
			<ListItemIcon>
				<Logout />
			</ListItemIcon>
			<ListItemText primary={t("Logout")} />
		</MenuItem>
	);
}
