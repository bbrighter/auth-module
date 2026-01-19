import { ReactNode } from 'react'

import { UserStateAdapter } from './interface'
import { AdapterContext } from './useAdapter'

export const UserManagementProvider = ({ adapter, children }: { adapter: UserStateAdapter, children: ReactNode }) => {
    return <AdapterContext.Provider value={adapter}>{children}</AdapterContext.Provider>
}
