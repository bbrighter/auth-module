import { useNavigateLogin } from '../navigation/useNavigate'
import { useAdapter } from '../useAdapter'

export const useLogout = () => {
    const adapter = useAdapter()
    const navigateLogin = useNavigateLogin()

    return () => {
        const [, setToken] = adapter.useToken()
        const [, setUserName] = adapter.useUserName()

        setToken('')
        setUserName('')
        navigateLogin()
    }

}