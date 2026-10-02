import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
	return (
		<Box>
			<Typography variant="h4">Nutzerverwaltung</Typography>
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
