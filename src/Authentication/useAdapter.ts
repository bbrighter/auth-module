import { createContext, useContext } from 'react'
import { AuthStateAdapter } from './interface'

export const AdapterContext = createContext<AuthStateAdapter | null>(null)

export const useAdapter = (): AuthStateAdapter => {
    const ctx = useContext(AdapterContext)
    if (!ctx) throw new Error('AuthProvider missing')

    return ctx
}