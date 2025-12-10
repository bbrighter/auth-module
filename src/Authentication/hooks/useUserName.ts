import { useAtomValue } from 'jotai'
import { usernameAtom } from '../store'

export const useUserName = () => {
    const userName = useAtomValue(usernameAtom)
    return userName
}