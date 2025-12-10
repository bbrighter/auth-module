import { atom } from 'jotai';
import { authApiAtom, productInstancesAtom, tokenAtom, usernameAtom } from './atoms';
import { respToProductInstances } from './types';

export const loginAtom = atom(null, async (get, set, { userName, password }: { userName: string, password: string }): Promise<boolean> => {
    const api = get(authApiAtom)
    if (!api) return false

    try {
        const resp = await api.Login({ userName, password })
        set(tokenAtom, resp.token)
        set(usernameAtom, userName)
        return true
    } catch {
        return false
    }
})

export const logoutAtom = atom(null, (_get, set) => {
    set(tokenAtom, '')
    set(usernameAtom, '')
})


export const getPermissionsAtom = atom(null, async (get, set) => {
    const api = get(authApiAtom)
    if (!api) return
    const resp = await api.GetPermissions()

    const instances = respToProductInstances(resp)
    set(productInstancesAtom, instances)

    const userName = resp.userName
    set(usernameAtom, userName)
})