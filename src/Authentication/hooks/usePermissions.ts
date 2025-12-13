
import { respToProductInstances } from '../interface'
import { useAdapter } from '../useAdapter'

export const useGetPermissions = () => {
    const adapter = useAdapter()
    const [api] = adapter.useAuthApi()
    const [, setInstances] = adapter.useProductInstances()
    const [, setUserName] = adapter.useUserName()

    return async () => {
        if (!api) return
        const resp = await api.GetPermissions()

        const instances = respToProductInstances(resp)
        setInstances(instances)

        const userName = resp.userName
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

    if (!location) return
    const urlId = location.split('/')[1]
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