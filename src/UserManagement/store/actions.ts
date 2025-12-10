import { atom } from 'jotai'
import { userApiAtom, usersAtom } from './atoms'
import { User } from './types'



export const getUsersAtom = atom(null, async (get, set) => {
    const authApi = get(userApiAtom)
    if (!authApi) throw new Error('UserAPI not provided')

    const resp = await authApi.GetUsersForProductInstance()
    const users: Array<User> = resp.users.map(u => ({ id: u.id, name: u.name }))
    set(usersAtom, users)
})

export const inviteUserAtom = atom(null, async (get, set, { userName }: { userName: string }) => {
    const authApi = get(userApiAtom)
    if (!authApi) throw new Error('UserAPI not provided')
    try {
        const resp = await authApi.AddUserToProductInstance(userName)
        const users = get(usersAtom)
        set(usersAtom, [...users, { id: resp.id, name: userName }])
    } catch (err: unknown) {
        if (typeof (err) == 'object' && err != null && 'status' in err && typeof (err.status) == 'number') {
            return err.status
        }
    }

})

export const deleteUserAtom = atom(null, async (get, set, { userName }: { userName: string }) => {
    const authApi = get(userApiAtom)
    if (!authApi) throw new Error('UserAPI not provided')
    await authApi.RemoveUserFromProductInstance(userName)
    const updatedUsers = get(usersAtom).filter(u => u.name != userName)
    set(usersAtom, updatedUsers)
})