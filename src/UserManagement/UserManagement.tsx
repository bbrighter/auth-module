import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UserInvite from "./components/UserInvite";
import UserList from "./components/UserList";

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
