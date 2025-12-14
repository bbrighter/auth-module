/* eslint-disable no-console */
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

export interface AuthStateAdapter {
    useToken(): [string, (_: string) => void]
    useAuthApi(): [AuthApi | null, (_: AuthApi) => void]
    useUserName(): [string, (_: string) => void]
    useProductInstances(): [Array<ProductInstance>, (_: Array<ProductInstance>) => void]
    useProductKey(): [ProductKey | null, (_: ProductKey) => void]
    useLocation(): [string, (_: string) => void]
}


export const defaultAdapter: AuthStateAdapter = {
    useToken: () => ['', (_: string) => console.log('not init')],
    useAuthApi: () => [null, (_: AuthApi) => console.log('not init')],
    useUserName: () => ['', (_: string) => console.log('not init')],
    useProductInstances: () => [[], (_: Array<ProductInstance>) => console.log('not init')],
    useProductKey: () => [null, (_: ProductKey) => console.log('not init')],
    useLocation: () => ['', (_: string) => console.log('not init')],
}

export type ProductInstance = {
    id: string
    productName: string
    productId: string
    url: string
}



export const respToProductInstances = (resp: AuthData): Array<ProductInstance> => {
    return resp.instances.map(i => {
        return {
            id: i.piid,
            productId: i.product,
            productName: productMap[i.product as ProductKey].name,
            url: productMap[i.product as ProductKey].url(),
            selected: false,
        }
    })
}

type ProductKey = 'shopping-list' | 'hista-complete'

const localOrProdUrl = (prodUrl: string) => {
    const hostname = new URL(window.location.href).host
    const isLocal = hostname.includes('localhost')
    return isLocal ? 'http://localhost:5173' : prodUrl
}

const productMap: Record<ProductKey, { name: string, url: () => string }> = {
    'shopping-list': { name: 'Einkaufsliste', url: () => localOrProdUrl('https://shopping-list-ui.vercel.app') },
    'hista-complete': { name: 'Hista', url: () => localOrProdUrl('https://hista-ui.vercel.app') },
} as const
