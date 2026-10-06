import { UserAvatar } from "./UserAvatar";

export const UserAvatarStory_FirstNameOnly = () => {
	return <UserAvatar onClick={() => alert("click")} userName={"Name"} />;
};

export const UserAvatarStory_FirstAndLastName = () => {
	return <UserAvatar onClick={() => alert("click")} userName={"First Last"} />;
};
