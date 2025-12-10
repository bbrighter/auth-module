import { useSetAtom } from 'jotai'
import { logoutAtom } from '../store'
import { useNavigateLogin } from '../navigation/useNavigate'

export const useLogout = () => {
    const logout = useSetAtom(logoutAtom)

    return () => {
        logout()
        useNavigateLogin()
    }
}