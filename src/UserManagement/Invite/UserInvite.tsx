import { useUserMgmt } from "../../users";
import { UserInviteView } from "./UserInviteView";

export default function UserInvite() {
	const { inviteUser } = useUserMgmt();

	return <UserInviteView inviteUser={inviteUser} />;
}
