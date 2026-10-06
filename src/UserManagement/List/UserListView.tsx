import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import { useTranslation } from "../../localization/useTranslation";
import type { User } from "../../users";

export type UserListProps = {
	currentUserName: string;
	users: readonly User[];
	setUsers: () => Promise<void>;
	avatarProps: (userName: string) => { sx: { bgcolor: string } };
	deleteUser: ({ userName }: { userName: string }) => Promise<void>;
};

export const UserListView = ({
	currentUserName,
	users,
	setUsers,
	avatarProps,
	deleteUser,
}: UserListProps) => {
	const t = useTranslation();
	// biome-ignore lint/correctness/useExhaustiveDependencies: setUsers does not change
	useEffect(() => {
		setUsers();
	}, []);

	return (
		<List sx={{ pt: "1rem", pb: "1rem" }}>
			{users.map((u) => (
				<ListItem
					key={u.id}
					secondaryAction={
						<IconButton
							onClick={() => deleteUser({ userName: u.name })}
							disabled={u.name === currentUserName}
							title={t("Löschen")}
						>
							<DeleteIcon />
						</IconButton>
					}
				>
					<ListItemAvatar sx={{ pr: "1rem" }}>
						<Avatar {...avatarProps(u.name)} />
					</ListItemAvatar>
					<ListItemText primary={u.name} />
				</ListItem>
			))}
		</List>
	);
};
