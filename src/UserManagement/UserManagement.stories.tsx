import { Providers } from "../ladle/components";
import { UserManagement } from "./UserManagement";

export const UserManagementStory = () => {
	return <UserManagement currentUserName={"Name"} />;
};

export const UserManagementStory_onlyOneUser = () => {
	return (
		<Providers users={{ users: [{ id: "1", name: "Name" }] }}>
			<UserManagement currentUserName="Name" />
		</Providers>
	);
};
