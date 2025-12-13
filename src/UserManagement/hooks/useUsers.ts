import { User } from '../types'
import { useAdapter } from '../useAdapter'

export const useUsers = () => {
    const adapter = useAdapter()
    const [users] = adapter.useUsers()
    return users
}

export const useGetUsers = () => {
    const adapter = useAdapter()
    const api = adapter.useApi()
    const piid = adapter.usePiid()
    const [, setUsers] = adapter.useUsers()
    if (!api) throw new Error('UserAPI not provided')

    return async () => {
        const resp = await api.GetUsersForProductInstance(piid)
        const users: Array<User> = resp.users.map(u => ({ id: u.id, name: u.name }))
        setUsers(users)
    }
}

export const useInviteUser = () => {
    const adapter = useAdapter()
    const api = adapter.useApi()
    const piid = adapter.usePiid()
    const [users, setUsers] = adapter.useUsers()
    if (!api) throw new Error('UserAPI not provided')

    return async ({ userName }: { userName: string }) => {
        try {
            const resp = await api.AddUserToProductInstance(piid, userName)
            setUsers([...users, { id: resp.id, name: userName }])
        } catch (err: unknown) {
            if (typeof (err) == 'object' && err != null && 'status' in err && typeof (err.status) == 'number') {
                return err.status
            }
        }
    }
}

export const useDeleteUser = () => {
    const adapter = useAdapter()
    const [users, setUsers] = adapter.useUsers()
    const piid = adapter.usePiid()
    const api = adapter.useApi()
    if (!api) throw new Error('UserAPI not provided')

    return async ({ userName }: { userName: string }) => {
        await api.RemoveUserFromProductInstance(piid, userName)

        const updatedUsers = users.filter(u => u.name != userName)
        setUsers(updatedUsers)
    }
}