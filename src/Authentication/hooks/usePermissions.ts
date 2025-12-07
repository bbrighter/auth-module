import { useAtomValue, useSetAtom } from 'jotai'
import { getPermissionsAtom, productInstancesAtom } from '../store'
import { useEffect } from 'react'
import { selectedProductInstanceAtom } from '../store/selectors'

export const useGetPermissions = (dependencies: Array<unknown> = []) => {
    const getPermissions = useSetAtom(getPermissionsAtom)
    useEffect(() => {
        getPermissions()
    }, dependencies)
}

export const usePermissions = () => {
    const permissions = useAtomValue(productInstancesAtom)
    return permissions
}

export const useActiveInstance = () => {
    const selectedInstance = useAtomValue(selectedProductInstanceAtom)
    return selectedInstance
}