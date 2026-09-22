import type { ReactNode } from "react";
import { AuthProvider } from "../auth";
import { UserManagementProvider } from "../users";
import { type AuthTestOptions, createAuthAdapter } from "./authAdapter";
import { createUserAdapter, type UserTestOptions } from "./userAdapter";

export const Providers = ({
	children,
	auth = {},
	users = {},
}: {
	children: ReactNode;
	auth?: Partial<AuthTestOptions>;
	users?: Partial<UserTestOptions>;
}) => {
	const userAdapter = createUserAdapter(users);
	const authAdapter = createAuthAdapter(auth);

	return (
		<AuthProvider adapter={authAdapter}>
			<UserManagementProvider adapter={userAdapter}>
				{children}
			</UserManagementProvider>
		</AuthProvider>
	);
};
