import { createContext, useContext } from 'react'

import { UserStateAdapter } from './interface'

export const AdapterContext = createContext<UserStateAdapter | null>(null)

export const useAdapter = (): UserStateAdapter => {
    const ctx = useContext(AdapterContext)
    if (!ctx) throw new Error('UserManagementProvider missing')

    return ctx
}
