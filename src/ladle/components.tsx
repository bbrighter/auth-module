import type { ReactNode } from "react";
import { AuthProvider } from "../auth";
import { SettingsProvider } from "../settings";
import { UserManagementProvider } from "../users";
import { type AuthTestOptions, createAuthAdapter } from "./authAdapter";
import {
	createSettingsAdapter,
	type SettingsTestOptions,
} from "./settingsAdapter";
import { createUserAdapter, type UserTestOptions } from "./userAdapter";

export const Providers = ({
	children,
	auth = {},
	users = {},
	settings = {},
}: {
	children: ReactNode;
	auth?: Partial<AuthTestOptions>;
	users?: Partial<UserTestOptions>;
	settings?: Partial<SettingsTestOptions>;
}) => {
	const userAdapter = createUserAdapter(users);
	const authAdapter = createAuthAdapter(auth);
	const settingsAdapter = createSettingsAdapter(settings);

	return (
		<SettingsProvider adapter={settingsAdapter}>
			<AuthProvider adapter={authAdapter}>
				<UserManagementProvider adapter={userAdapter}>
					{children}
				</UserManagementProvider>
			</AuthProvider>
		</SettingsProvider>
	);
};
