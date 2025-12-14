import { ReactNode } from 'react';
import { AuthStateAdapter } from './interface';
import { AdapterContext } from './useAdapter';

export function AuthProvider({ adapter, children }: { adapter: AuthStateAdapter, children: ReactNode }) {

    return <AdapterContext.Provider value={adapter}>{children}</AdapterContext.Provider>;
}

