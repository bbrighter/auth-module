import { useAtomValue, useSetAtom } from 'jotai'
import { getPermissionsAtom, productInstancesAtom } from '../store'
import { selectedProductInstanceAtom } from '../store/selectors'

export const useGetPermissions = () => (useSetAtom(getPermissionsAtom))

export const usePermissions = () => useAtomValue(productInstancesAtom)

export const useActiveInstance = () => useAtomValue(selectedProductInstanceAtom)
