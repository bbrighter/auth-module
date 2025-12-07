import { getDefaultStore } from 'jotai'
import { piidAtom } from '../store'
import { useAtomValue } from 'jotai';

export const piid = () => {
    return getDefaultStore().get(piidAtom)
}


export const usePiid = () => {
    const piid = useAtomValue(piidAtom)
    return piid
}