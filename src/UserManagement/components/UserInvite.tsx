import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import Stack from '@mui/material/Stack'
import { useInviteUser } from '../hooks/useUsers'

export default function UserInvite() {
    const inviteUser = useInviteUser()

    const [userToInvite, setUserToInvite] = useState('')
    const [inviteLoading, setInviteLoading] = useState(false)
    const [status, setStatus] = useState<undefined | number>()

    const onInvite = async () => {
        setInviteLoading(true)
        const status = await inviteUser({ userName: userToInvite })
        setStatus(status)
        setInviteLoading(false)
        if (status == undefined) {
            setUserToInvite('')
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserToInvite(e.currentTarget.value)
        setStatus(undefined)
    }


    return (
        <Stack direction='row' spacing={2}>
            <TextField
                fullWidth
                label='Nutzer einladen'
                value={userToInvite}
                onChange={onChange}
                error={status != undefined}
                helperText={status == 404 ? 'Nutzer existiert nicht' : ''}
                onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
                onClick={onInvite}
                loading={inviteLoading}
            >Einladen
            </Button>
        </Stack>

    )
}