import { useAuth } from "../../../auth";
import { LogoutView } from "./LogoutView";

export const Logout = () => {
	const { token, logout } = useAuth();

	return <LogoutView token={token} logout={logout} />;
};
