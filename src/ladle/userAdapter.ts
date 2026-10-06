/** biome-ignore-all lint/suspicious/noConsole: Used for ladle only */
import type { User, UserStateAdapter } from "../users";

export type UserTestOptions = {
	users?: Array<User>;
	piid?: string;
};

export const createUserAdapter = (
	options: UserTestOptions,
): UserStateAdapter => {
	const {
		users = [
			{ id: "123", name: "Name" },
			{ id: "456", name: "Other user" },
		],
		piid = "piid",
	} = options;

	return {
		useApi: () => ({
			AddUserToProductInstance: async (_piid, _name) => ({ id: "123" }),
			GetUsersForProductInstance: async (_piid) => ({ users: users }),
			RemoveUserFromProductInstance: async (id, name) => console.log(id, name),
		}),
		usePiid: () => piid,
		useUsers: () => ({
			users: users,
			setUsers: (u: Array<User>) => console.log(u),
		}),
	};
};
