import { useEffect } from 'react'
import { UNAUTHORIZED_EVENT } from './constants'

export const useHandleUnauthorized = (
    navigate: (_path: string) => void,
) => {

    useEffect(() => {
        const onUnauthorized = (e: Event) => {
            const path = (e as CustomEvent).detail as string

            if (!path) return

            if (path.includes('login')) return

            const guidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
            const match = path.match(guidRegex)
            const redirectPath = match ? `/login?redirectTo=${match}` : '/login'
            navigate(redirectPath)
        }

        window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
        return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    })
}