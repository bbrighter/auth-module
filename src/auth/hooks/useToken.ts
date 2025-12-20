import { useAdapter } from '../useAdapter'

export const useToken = () => {
    const adapter = useAdapter()
    const { token } = adapter.useToken()
    return token
}