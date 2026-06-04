import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { useUserMgmt } from "../../users";

export default function UserDeleteButton(props: {
	userName: string;
	currentUserName: string;
}) {
	const { deleteUser } = useUserMgmt();

	return (
		<IconButton
			onClick={() => deleteUser({ userName: props.userName })}
			disabled={props.userName === props.currentUserName}
			data-testid="deleteUser"
		>
			<DeleteIcon />
		</IconButton>
	);
}
