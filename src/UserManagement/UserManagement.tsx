import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UserInvite from "./Invite/UserInvite";
import UserList from "./List/UserList";

export function UserManagement({
	currentUserName,
}: {
	currentUserName: string;
}) {
	return (
		<Box>
			<Typography variant="h4">Nutzerverwaltung</Typography>
			<UserList currentUserName={currentUserName} />
			<UserInvite />
		</Box>
	);
}
