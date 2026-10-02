/** biome-ignore-all lint/suspicious/noConsole: Testing */
import {
	type UserManagementProps,
	UserManagementView,
} from "./UserManagementView";

// export const UserManagementStory = () => {
// 	return <UserManagement currentUserName={"Name"} />;
// };

// export const UserManagementStory_onlyOneUser = () => {
// 	return (
// 		<Providers users={{ users: [{ id: "1", name: "Name" }] }}>
// 			<UserManagement currentUserName="Name" />
// 		</Providers>
// 	);
// };

const user1 = { name: "User 1", id: "1" };
const user2 = { name: "Other user", id: "2" };
const avatarColorMapping = new Map([
	[user1.name, "red"],
	[user2.name, "blue"],
]);

const defaultUserManagementView = (
	props: Partial<UserManagementProps> = {},
) => (
	<UserManagementView
		currentUserName={user1.name}
		users={[user1]}
		setUsers={async () => console.log("setUsers")}
		avatarProps={(userName) => ({
			sx: {
				bgcolor: avatarColorMapping.get(userName) ?? "gray",
			},
		})}
		deleteUser={async ({ userName }) => console.log(userName)}
		inviteUser={async ({ userName }) => {
			await console.log(userName);
			return;
		}}
		{...props}
	/>
);

export const TwoUsers = () =>
	defaultUserManagementView({
		users: [user1, { id: "2", name: "Other user" }],
	});

export const Error404OnInvite = () =>
	defaultUserManagementView({ inviteUser: async () => 404 });
