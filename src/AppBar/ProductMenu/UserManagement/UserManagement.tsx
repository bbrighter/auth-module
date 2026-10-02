import { useAuth } from "../../../auth";
import { useUserMgmt } from "../../../users";
import UserManagementView from "./UserManagementView";

export default function UserManagement() {
	const { userName } = useAuth();
	const { avatarProps, deleteUser, inviteUser, setUsers, users } =
		useUserMgmt();

	return (
		<UserManagementView
			avatarProps={avatarProps}
			currentUserName={userName}
			deleteUser={deleteUser}
			inviteUser={inviteUser}
			setUsers={setUsers}
			users={users}
		/>
	);
}
