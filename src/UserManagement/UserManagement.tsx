import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserList from './components/UserList';
import UserInvite from './components/UserInvite';
import { useAtomValue } from 'jotai';
import { apiAtom } from './store';

export function UserManagement({ currentUserName }: { currentUserName: string }) {
    const api = useAtomValue(apiAtom)
    if (!api) return (<>Loading...</>)
    return (
        <Box>
            <Typography variant='h4'>Nutzerverwaltung</Typography>
            <UserList currentUserName={currentUserName} />
            <UserInvite />
        </Box>
    )
}