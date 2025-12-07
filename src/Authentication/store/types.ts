import { AuthData } from '../interface'

export type ProductInstance = {
    id: string
    productName: string
    productId: string
    selected: boolean
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

export type ProductKey = 'shopping-list' | 'hista-complete'

const localOrProdUrl = (prodUrl: string) => {
    const hostname = new URL(window.location.href).host
    const isLocal = hostname.includes('localhost')
    return isLocal ? 'http://localhost:5173' : prodUrl
}

const productMap: Record<ProductKey, { name: string, url: () => string }> = {
    'shopping-list': { name: 'Einkaufsliste', url: () => localOrProdUrl('https://shopping-list-ui.vercel.app') },
    'hista-complete': { name: 'Hista', url: () => localOrProdUrl('https://hista-ui.vercel.app') },
} as const
