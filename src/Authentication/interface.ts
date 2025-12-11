import { ProductInstance, ProductKey } from './types'


export type LoginParams = {
    userName: string
    password: string
}

type TokenResponse = {
    token: string
}

export interface AuthData {
    instances: AuthProductInstance[]
    userName: string
    userId: string
}

interface AuthProductInstance {
    appMapping: { [key: string]: boolean }
    piid: string
    product: string
}

interface AuthApi {
    Login: (_params: LoginParams) => Promise<TokenResponse>
    GetPermissions: () => Promise<AuthData>
}

export interface AuthStateAdapter {
    useToken(): [string, (_: string) => void]
    useAuthApi(): [AuthApi | null, (_: AuthApi) => void]
    useUserName(): [string, (_: string) => void]
    useProductInstances(): [Array<ProductInstance>, (_: Array<ProductInstance>) => void]
    useProductKey(): [ProductKey | null, (_: ProductKey) => void]
    useLocation(): [string, (_: string) => void]
}