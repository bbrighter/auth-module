import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthData, LoginParams } from './interface';
import { Login } from './Login';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDefaultStore } from 'jotai';
import { getPermissionsAtom } from './store';
import { AuthProvider } from './AuthProvider';


let mockLocation = '/login'
const navigateSpy = vi.fn();
const mockSearchParams = new URLSearchParams('redirectTo=redirectUrl');

vi.mock('wouter', () => {
    const actual = vi.importActual('wouter')
    return {
        ...actual,
        useLocation: () => [mockLocation, (to: string) => {
            mockLocation = to
            navigateSpy(to)
        }],
        useSearchParams: () => [mockSearchParams, vi.fn()],
    }
})

describe('Login', () => {
    const mockApi = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Login: async (_: LoginParams) => ({ token: 'token-string' }),
        GetPermissions: async () => ({ instances: [{ piid: '22990bce-4968-46c6-bcc8-6654f8a5cf35', product: 'shopping-list' }], userId: '123', userName: 'name' } as AuthData),
    }


    beforeEach(() => {
        vi.clearAllMocks()
        mockLocation = '/login'
    })

    const login = async () => {
        const nameInput = screen.getByLabelText('Name')
        expect(nameInput).toBeInTheDocument()
        await userEvent.type(nameInput, 'name')

        const passwordInput = screen.getByLabelText('Passwort')
        expect(passwordInput).toBeInTheDocument()
        await userEvent.type(passwordInput, 'password')

        const loginButton = screen.getByText('Login')
        expect(loginButton).toBeInTheDocument()
        await userEvent.click(loginButton)
    }

    it('Login redirects to redirect url', async () => {
        render(<AuthProvider api={mockApi}>
            <Login productKey={'shopping-list'} />
        </AuthProvider>)

        await login()

        expect(navigateSpy).toHaveBeenCalledWith('redirectUrl')
    })

    it('Login redirects to piid from permissions', async () => {
        render(<AuthProvider api={mockApi}>
            <Login productKey={'shopping-list'} />
        </AuthProvider>)
        await act(async () => {
            await getDefaultStore().set(getPermissionsAtom)
        })

        await login()

        expect(navigateSpy).toHaveBeenCalledWith('/22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })
})