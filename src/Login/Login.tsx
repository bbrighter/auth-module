import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AuthApi } from './interface';
import { apiAtom, loginAtom, ProductKey } from './store';
import { useActiveInstance } from './hooks/usePermissions';

export default function Login({ api, productKey, redirectTo }: { api: AuthApi, productKey: ProductKey, redirectTo?: string }) {
    const setApi = useSetAtom(apiAtom)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const login = useSetAtom(loginAtom)
    const activeInstance = useActiveInstance(productKey)
    const [, navigate] = useLocation()
    const [loginState, setLoginState] = useState<'default' | 'error' | 'loading' | 'success'>('default')

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onLogin = async () => {
        setLoginState('loading')
        const ok = await login({ password: password, userName: name })
        if (ok) {
            setLoginState('success')
        } else {
            setLoginState('error')
        }
    }

    useEffect(() => {
        setApi(api)
    }, [])

    useEffect(() => {
        if (loginState == 'success' && redirectTo) {
            navigate(redirectTo)
            return
        }
        if (loginState == 'success' && activeInstance && activeInstance.id) {
            navigate(`/${activeInstance.id}`)
        }
    }, [activeInstance, loginState])

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