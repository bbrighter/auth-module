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
    AddUserToProductInstance(name: string): Promise<UUIDResponse>
    GetUsersForProductInstance(): Promise<UserListResponse>
    RemoveUserFromProductInstance(name: string): Promise<void>
}