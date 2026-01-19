import { useActiveInstance, useGetPermissions, useInstancesLoaded, useLogout, usePermissions, usePiid, useToken, useUserName } from './hooks'
import { useLogin } from './hooks/useLogin'
import { useNavigate } from './navigation'

export const useAuth = () => {
    const login = useLogin()
    const logout = useLogout()
    const setPermissions = useGetPermissions()
    const permissions = usePermissions()
    const activeInstance = useActiveInstance()
    const token = useToken()
    const userName = useUserName()
    const navigate = useNavigate()
    const piid = usePiid()
    const isLoaded = useInstancesLoaded()

    return {
        login,
        logout,
        setPermissions,
        permissions,
        token,
        userName,
        navigate,
        activeInstance,
        piid,
        isLoaded,
    }
}
