import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "../localization/useTranslation";
import { type UserInviteProps, UserInviteView } from "./Invite/UserInviteView";
import { type UserListProps, UserListView } from "./List/UserListView";

export type UserManagementProps = UserListProps & UserInviteProps;

export const UserManagementView = ({
	currentUserName,
	users,
	setUsers,
	avatarProps,
	deleteUser,
	inviteUser,
}: UserManagementProps) => {
	const t = useTranslation();
	return (
		<Box>
			<Typography variant="h4">{t("Nutzerverwaltung")}</Typography>
			<UserListView
				currentUserName={currentUserName}
				users={users}
				setUsers={setUsers}
				avatarProps={avatarProps}
				deleteUser={deleteUser}
			/>
			<UserInviteView inviteUser={inviteUser} />
		</Box>
	);
};
