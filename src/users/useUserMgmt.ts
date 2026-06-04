import {
	useDeleteUser,
	useGetUsers,
	useInviteUser,
	useUserAvatar,
	useUsers,
} from "./hooks";

export const useUserMgmt = () => {
	const setUsers = useGetUsers();
	const users = useUsers();
	const inviteUser = useInviteUser();
	const deleteUser = useDeleteUser();
	const avatarProps = useUserAvatar;

	return {
		users,
		setUsers,
		inviteUser,
		deleteUser,
		avatarProps,
	};
};
