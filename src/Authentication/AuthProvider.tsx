import { ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { AuthApi } from './interface';
import { apiAtom, ProductKey, productKeyAtom } from './store';

export function AuthProvider({ api, productKey, children }: { api: AuthApi, productKey: ProductKey, children: ReactNode }) {
    const setApi = useSetAtom(apiAtom);
    const setProductKey = useSetAtom(productKeyAtom)
    setApi(api)
    setProductKey(productKey)

    // useEffect(() => {
    //     console.log('Setting API to:', api)
    //     setApi(api);
    // }, [api]);

    return <>{children}</>;
}
