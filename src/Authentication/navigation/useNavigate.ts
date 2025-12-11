import { useActiveInstance } from '../hooks'
import { useAdapter } from '../useAdapter'

export const useNavigateLogin = () => {
    const adapter = useAdapter()
    const [location, navigate] = adapter.useLocation()

    return () => {
        if (!location.startsWith('/login')) {
            navigate(`/login?redirectTo=${location}`)
        }
    }
}

export const useNavigate = () => {
    const adapter = useAdapter()
    const [location, navigate] = adapter.useLocation()
    const activeInstance = useActiveInstance()


    return () => {
        const url = new URL(location)
        const redirectTo = url.searchParams.get('redirectTo')
        if (redirectTo) {
            navigate(redirectTo)
            return
        }
        if (activeInstance && activeInstance.id) {
            navigate('/' + activeInstance.id)
            return
        }
    }
}