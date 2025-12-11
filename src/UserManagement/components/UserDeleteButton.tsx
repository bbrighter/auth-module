import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { useDeleteUser } from '../hooks/useUsers';
import { User } from '../types';

export default function UserDeleteButton(props: { user: User, currentUserName: string }) {
    const deleteUser = useDeleteUser()

    return (
        <IconButton
            onClick={() => deleteUser({ userName: props.user.name })}
            disabled={props.user.name == props.currentUserName}
            data-testid='deleteUser'
        >
            <DeleteIcon />
        </IconButton>
    )
}