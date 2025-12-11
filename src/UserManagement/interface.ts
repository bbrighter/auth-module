import { User } from './types'

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

export interface UserStateAdapter {
    useUsers(): [Array<User>, (_: Array<User>) => void]
    useApi(): [UserAPI | null, (_: UserAPI) => void]
}