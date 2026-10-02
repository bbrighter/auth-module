import { useUserMgmt } from "../../users";
import { UserListView } from "./UserListView";

export default function UserList({
	currentUserName,
}: {
	currentUserName: string;
}) {
	const { users, setUsers, avatarProps, deleteUser } = useUserMgmt();

	return (
		<UserListView
			currentUserName={currentUserName}
			users={users}
			setUsers={setUsers}
			avatarProps={avatarProps}
			deleteUser={deleteUser}
		/>
	);
}
