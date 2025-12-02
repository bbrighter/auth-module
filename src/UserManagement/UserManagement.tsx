import { useAtom } from 'jotai';
import { UserAPI } from './interface';
import { apiAtom } from './store/atoms';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserList from './components/UserList';
import UserInvite from './components/UserInvite';

export function UserManagement({ api }: { api: UserAPI }) {
    const [storedApi, setApi] = useAtom(apiAtom)

    useEffect(() => {
        setApi(api)
    }, [api])

    if (!storedApi) return (<>Nothing found</>)

    return (
        <Box>
            <Typography variant='h4'>Nutzerverwaltung</Typography>
            <UserList />
            <UserInvite />
        </Box>
    )
}