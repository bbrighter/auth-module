import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { useEffect } from 'react'
import UserDeleteButton from './UserDeleteButton'
import { useUserMgmt } from '../../users'

export default function UserList({ currentUserName }: { currentUserName: string }) {
    const { users, setUsers, avatarProps } = useUserMgmt()

    useEffect(() => {
        setUsers()
    }, [])


    return (
        <List sx={{ pt: '1rem', pb: '1rem' }}>
            {users.map(u => (
                <ListItem key={u.id}
                    secondaryAction={<UserDeleteButton userName={u.name} currentUserName={currentUserName} />}
                >
                    <ListItemAvatar sx={{ pr: '1rem' }}><Avatar {...avatarProps(u.name)} /></ListItemAvatar>
                    <ListItemText primary={u.name} />
                </ListItem>
            ))
            }
        </List >
    )
}
