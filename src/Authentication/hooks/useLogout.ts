import { useNavigateLogin } from '../navigation'
import { useAdapter } from '../useAdapter'

export const useLogout = () => {
    const adapter = useAdapter()
    const navigateLogin = useNavigateLogin()
    const [, setToken] = adapter.useToken()
    const [, setUserName] = adapter.useUserName()

    return () => {
        setToken('')
        setUserName('')
        navigateLogin()
    }

}