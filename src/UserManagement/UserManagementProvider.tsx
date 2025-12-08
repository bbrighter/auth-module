import { useSetAtom } from 'jotai';
import { UserAPI } from './interface';
import { apiAtom } from './store';
import { ReactNode, useEffect } from 'react';

export const UserManagementProvider = ({ api, children }: { api: UserAPI, children: ReactNode }) => {
    const setUserApi = useSetAtom(apiAtom)
    useEffect(() => {
        setUserApi(api)
    }, [api])

    return <>{children}</>;


}