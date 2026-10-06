import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { type UserListProps, UserListView } from "../List/UserListView";

describe("UserList component", () => {
	const setUsers = vi.fn();
	const avatarProps = vi.fn();
	const deleteUser = vi.fn();
	const user1 = { id: "1", name: "User name" };
	const user2 = { id: "2", name: "Other user" };
	const renderList = (props: Partial<UserListProps> = {}) =>
		render(
			<UserListView
				currentUserName={"User name"}
				users={[user1]}
				setUsers={setUsers}
				avatarProps={avatarProps}
				deleteUser={deleteUser}
				{...props}
			/>,
		);

	it("Renders 2 users", () => {
		renderList({ users: [user1, user2] });

		const users = screen.getAllByRole("listitem");
		expect(users).toHaveLength(2);
		expect(users[0]).toHaveTextContent("User name");
		expect(users[1]).toHaveTextContent("Other user");
		expect(setUsers).toHaveBeenCalledOnce();
	});

	it("Current user cannot be deleted", () => {
		renderList();

		const deleteButton = screen.getByRole("button", { name: "Löschen" });
		expect(deleteButton).toBeDisabled();
	});

	it("Other user can be deleted", async () => {
		renderList({ users: [user2] });

		const deleteButton = screen.getByRole("button", { name: "Löschen" });
		expect(deleteButton).toBeEnabled();
		await userEvent.click(deleteButton);

		expect(deleteUser).toHaveBeenCalledExactlyOnceWith({
			userName: "Other user",
		});
	});

	it("Avatar is created based on name", () => {
		renderList();

		expect(avatarProps).toHaveBeenCalledWith("User name");
	});
});
