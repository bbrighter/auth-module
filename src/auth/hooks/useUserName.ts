import { useAdapter } from '../useAdapter'

export const useUserName = () => {
    const adapter = useAdapter()
    const { userName } = adapter.useUserName()
    return userName
}