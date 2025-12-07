import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'wouter';
import { loginAtom } from './store';
import { useActiveInstance } from './hooks/usePermissions';

export function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const login = useSetAtom(loginAtom)
    const activeInstance = useActiveInstance()
    const [, navigate] = useLocation()
    const [loginState, setLoginState] = useState<'default' | 'error' | 'loading' | 'success'>('default')
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

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

        if (redirectTo) {
            const redirectUrl = redirectTo.startsWith('/') ? redirectTo : '/' + redirectTo
            navigate(redirectUrl)
            return
        }

        if (activeInstance && activeInstance.id) {
            navigate('/' + activeInstance.id)
            return
        }

    }, [activeInstance, redirectTo, navigate, loginState])

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