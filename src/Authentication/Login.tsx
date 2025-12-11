import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useEffect, useState, ChangeEvent } from 'react';
import { useActiveInstance } from './hooks/usePermissions';
import { useLogin } from './hooks/useLogin';
import { useNavigate } from './navigation';

export function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const login = useLogin()
    const navigate = useNavigate()
    const activeInstance = useActiveInstance()

    const [loginState, setLoginState] = useState<'default' | 'error' | 'loading' | 'success'>('default')


    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

    const onLogin = async () => {
        setLoginState('loading')
        const ok = await login({ password: password, userName: name })
        if (!ok) {
            setLoginState('error')
            return
        }
        setLoginState('success')
    }

    useEffect(() => {
        if (loginState != 'success') return
        navigate()
    }, [activeInstance, navigate, loginState])

    return (<Container sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '20rem' }}>
        <TextField label="Name" value={name} onChange={onNameChange} />
        <TextField label="Passwort" type='password' value={password} onChange={onPasswordChange} />
        <Button
            variant='contained'
            onClick={onLogin}
            loading={loginState == 'loading'}
            color={loginState == 'error' ? 'error' : 'primary'}
        >Login</Button>
    </Container>)
}