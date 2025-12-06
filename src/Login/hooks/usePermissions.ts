import { useAtomValue, useSetAtom } from 'jotai'
import { getPermissionsAtom, locationAtom, productInstancesAtom, ProductKey } from '../store'
import { useEffect } from 'react'

export const useGetPermissions = () => {
    const getPermissions = useSetAtom(getPermissionsAtom)
    useEffect(() => {
        getPermissions()
    }, [])
}

export const usePermissions = () => {
    const permissions = useAtomValue(productInstancesAtom)
    return permissions
}

export const useActiveInstance = (product: ProductKey) => {
    const instances = usePermissions()

    const location = useAtomValue(locationAtom)
    const urlId = location.pathname?.split('/')[1]

    const resolvedUrlPiid = () => {
        if (!urlId) return undefined
        if (isGuid(urlId)) return urlId
        if (urlId == 'login') return location.searchParams?.get('piid')
        return undefined
    }

    const urlPiid = resolvedUrlPiid()

    if (urlPiid) {
        return instances.find(i => i.id == urlPiid) ?? instances.at(0)
    }
    return instances.find(i => i.productId == product) ?? instances.at(0)

}

const isGuid = (testString: string | undefined): boolean => {
    const guidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    return testString != undefined && guidRegex.test(testString)
}