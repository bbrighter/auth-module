import { ProductInstance } from '../interface'
import { useAdapter } from '../useAdapter'

export const useNavigateLogin = () => {
    const adapter = useAdapter()
    const { location, navigate } = adapter.useLocation()

    return () => {
        if (!location.includes('/login')) {
            navigate(`/login?redirectTo=${location}`)
        }
    }
}

export const useNavigate = () => {
    const adapter = useAdapter()
    const { location, navigate } = adapter.useLocation()

    return (activeInstance: ProductInstance | undefined) => {
        if (!location) return
        const url = new URL(location, window.location.origin)
        const redirectTo = url.searchParams.get('redirectTo')
        if (redirectTo) {
            navigate(redirectTo)
            return
        }
        if (activeInstance && activeInstance.id) {
            navigate('/' + activeInstance.id)
        }
    }
}
