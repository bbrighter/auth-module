import { Box, MenuItem, Modal } from "@mui/material";
import { useState } from "react";
import {
	type UserManagementProps,
	UserManagementView as UserMgmtView,
} from "../../../UserManagement/UserManagementView";

export default function UserManagementView(props: UserManagementProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<MenuItem onClick={() => setOpen(true)}>Benutzer</MenuItem>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box
					sx={{
						width: "80%",
						bgcolor: "background.paper",
						position: "absolute",
						maxWidth: "750px",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						padding: "1rem",
						borderRadius: "0.5rem",
					}}
				>
					<UserMgmtView {...props} />
				</Box>
			</Modal>
		</>
	);
}
