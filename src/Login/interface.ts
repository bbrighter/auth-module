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

export interface AuthApi {
    Login: (_params: LoginParams) => Promise<TokenResponse>
    GetPermissions: () => Promise<AuthData>
}