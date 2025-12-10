import { useSetAtom } from 'jotai';
import { UserAPI } from './interface';
import { userApiAtom } from './store';
import { ReactNode } from 'react';

export const UserManagementProvider = ({ api, children }: { api: UserAPI, children: ReactNode }) => {
    const setUserApi = useSetAtom(userApiAtom)
    setUserApi(api)

    return <>{children}</>;


}