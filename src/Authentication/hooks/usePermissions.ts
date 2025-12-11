
import { respToProductInstances } from '../types'
import { useAdapter } from '../useAdapter'

export const useGetPermissions = () => {
    const adapter = useAdapter()

    return async () => {
        const [api] = adapter.useAuthApi()
        if (!api) return
        const resp = await api.GetPermissions()

        const instances = respToProductInstances(resp)
        const [, setInstances] = adapter.useProductInstances()
        setInstances(instances)

        const userName = resp.userName
        const [, setUserName] = adapter.useUserName()
        setUserName(userName)
    }
}

export const usePermissions = () => {
    const adapter = useAdapter()
    const [instances] = adapter.useProductInstances()
    return instances
}

export const useActiveInstance = () => {
    const adapter = useAdapter()
    const [instances] = adapter.useProductInstances()
    const [location] = adapter.useLocation()
    const [product] = adapter.useProductKey()

    const url = new URL(location)
    const urlId = url.pathname?.split('/')[1]
    const urlPiid = urlId && isGuid(urlId) ? urlId : undefined

    if (urlPiid) {
        return instances.find(i => i.id == urlPiid) ?? instances.at(0)
    }
    return instances.find(i => i.productId == product) ?? instances.at(0)
}

const isGuid = (testString: string | undefined): boolean => {
    const guidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    return testString != undefined && guidRegex.test(testString)
}