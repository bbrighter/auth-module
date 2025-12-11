import { useAdapter } from '../useAdapter'

export const useLogin = () => {
    const adapter = useAdapter()
    const [api] = adapter.useAuthApi()
    return async ({ userName, password }: { userName: string, password: string }) => {
        if (!api) return false

        try {
            const resp = await api.Login({ userName, password })
            const [, setToken] = adapter.useToken()
            setToken(resp.token)
            const [, setUserName] = adapter.useUserName()
            setUserName(userName)
            return true
        } catch {
            return false
        }
    }

}