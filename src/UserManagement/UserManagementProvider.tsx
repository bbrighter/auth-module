import { UserStateAdapter } from './interface';
import { ReactNode } from 'react';
import { AdapterContext } from './useAdapter';

export const UserManagementProvider = ({ adapter, children }: { adapter: UserStateAdapter, children: ReactNode }) => {

    return <AdapterContext.Provider value={adapter}>{children}</AdapterContext.Provider>;


}