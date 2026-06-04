import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";

import { useAuth } from "../../auth";

export default function ProductSelection() {
	const { permissions, activeInstance } = useAuth();
	const color = (instanceId: string) =>
		instanceId === activeInstance?.id ? "primary.main" : undefined;

	const url = (id: string) => {
		const instance = permissions.find((p) => p.id === id);
		if (!instance) return;
		const url = `${instance.url}/${instance.id}`;
		return url;
	};

	return (
		<>
			{" "}
			{permissions.map((i) => (
				<MenuItem component="a" key={i.id} href={url(i.id)}>
					<ListItemText
						primary={i.productName}
						secondary={i.id}
						sx={{ color: color(i.id) }}
					/>
				</MenuItem>
			))}
		</>
	);
}
