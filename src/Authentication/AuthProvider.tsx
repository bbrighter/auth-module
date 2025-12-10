import { ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { AuthApi } from './interface';
import { authApiAtom, ProductKey, productKeyAtom } from './store';

export function AuthProvider({ api, productKey, children }: { api: AuthApi, productKey: ProductKey, children: ReactNode }) {
    const setApi = useSetAtom(authApiAtom);
    const setProductKey = useSetAtom(productKeyAtom)
    setApi(api)
    setProductKey(productKey)

    return <>{children}</>;
}
