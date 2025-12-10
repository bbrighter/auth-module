import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { useSetAtom } from 'jotai';
import { deleteUserAtom, User } from '../store';

export default function UserDeleteButton(props: { user: User, currentUserName: string }) {
    const deleteUser = useSetAtom(deleteUserAtom)

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