import { createContext, useContext } from 'react'
import { AuthStateAdapter, defaultAdapter } from './interface'


export const AdapterContext = createContext<AuthStateAdapter>(defaultAdapter)


export const useAdapter = (): AuthStateAdapter => {
    const ctx = useContext(AdapterContext)

    return ctx
}