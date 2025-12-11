import { useActiveInstance } from '../hooks';

// export const piid = () => {
//     return getDefaultStore().get(piidAtom)
// }

export const usePiid = () => {
    const instance = useActiveInstance()
    return instance?.id
}