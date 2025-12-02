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
    AddUserToProductInstance(_name: string): Promise<UUIDResponse>
    GetUsersForProductInstance(): Promise<UserListResponse>
    RemoveUserFromProductInstance(_name: string): Promise<void>
}