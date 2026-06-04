import { vi } from "vitest";

import type { UserAPI, UserStateAdapter } from "../interface";

export const mockAddUserApi = vi.fn();
export const mockGetUsersApi = vi.fn();
export const mockRemoveUserApi = vi.fn();
export const mockSetUsers = vi.fn();

const createMockUserApi = (overrides?: Partial<UserAPI>): UserAPI => ({
	AddUserToProductInstance: mockAddUserApi,
	GetUsersForProductInstance: mockGetUsersApi,
	RemoveUserFromProductInstance: mockRemoveUserApi,
	...overrides,
});

export const createMockAdapter = (
	overrides?: Partial<UserStateAdapter>,
): UserStateAdapter => ({
	useApi: () => createMockUserApi(),
	useUsers: () => ({
		users: [{ id: "123", name: "user 1" }],
		setUsers: mockSetUsers,
	}),
	usePiid: () => "ABC",
	...overrides,
});
