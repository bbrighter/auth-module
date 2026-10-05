import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import type { ProductInstance } from "../../../auth";
import { useTranslation } from "../../../localization/useTranslation";

type ProductSelectionProps = {
	activeInstance: ProductInstance | undefined;
	permissions: readonly ProductInstance[];
};

export default function ProductSelectionView({
	activeInstance,
	permissions,
}: ProductSelectionProps) {
	const t = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const url = (id: string) => {
		const instance = permissions.find((p) => p.id === id);
		if (!instance) return;
		const url = `${instance.url}/${instance.id}`;
		return url;
	};

	return (
		<>
			<MenuItem onClick={handleClick} selected={open}>
				{t("Produkte")}
			</MenuItem>
			<Menu
				open={open}
				onClose={handleClose}
				disableRestoreFocus
				anchorEl={anchorEl}
				anchorOrigin={{
					horizontal: "left",
					vertical: "top",
				}}
				transformOrigin={{
					horizontal: "right",
					vertical: "top",
				}}
			>
				{permissions.map((i) => (
					<MenuItem
						component="a"
						key={i.id}
						href={url(i.id)}
						selected={i.id === activeInstance?.id}
					>
						<ListItemText primary={i.productName} secondary={i.id} />
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
