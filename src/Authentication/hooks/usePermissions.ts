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

export const usePermissions = () => useAtomValue(productInstancesAtom)

export const useActiveInstance = () => useAtomValue(selectedProductInstanceAtom)
