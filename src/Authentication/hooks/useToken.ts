import { useAtomValue } from 'jotai'
import { tokenAtom } from '../store'

export const useToken = () => {
    const token = useAtomValue(tokenAtom)
    return token
}