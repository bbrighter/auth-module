interface UUIDResponse {
    id: string
}

interface UserListResponse {
    users: UserResponse[]
}

interface UserResponse {
    name: string
    id: string
}

export interface UserAPI {
    AddUserToProductInstance(_piid: string, _name: string): Promise<UUIDResponse>
    GetUsersForProductInstance(_piid: string): Promise<UserListResponse>
    RemoveUserFromProductInstance(_piid: string, _name: string): Promise<void>
}

export interface UserStateAdapter {
    useUsers(): { users: readonly User[], setUsers: (_: Array<User>) => void }
    useApi(): UserAPI | null
    usePiid(): string
}

export type User = {
    id: string
    name: string
}
