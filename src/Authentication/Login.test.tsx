import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthData, AuthStateAdapter, LoginParams } from './interface';
import { Login } from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from './AuthProvider';
import { ProductInstance } from './types';

const navigateMock = vi.fn()

describe('Login', () => {
    const mockApi = {
        Login: async (_: LoginParams) => ({ token: 'token-string' }),
        GetPermissions: async () => ({} as AuthData),
    }
    const mockAdapter: AuthStateAdapter = {
        useToken: () => ['token-string', vi.fn()],
        useAuthApi: () => [mockApi, vi.fn()],
        useUserName: () => ['user 1', vi.fn()],
        useProductInstances: () => [[{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }] as Array<ProductInstance>, vi.fn()],
        useProductKey: () => ['shopping-list', vi.fn()],
        useLocation: () => ['http://localhost:5137/22990bce-4968-46c6-bcc8-6654f8a5cf35/login?redirectTo=/redirectUrl', navigateMock],
    }



    beforeEach(() => {
        vi.clearAllMocks()
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
        render(<AuthProvider adapter={mockAdapter}>
            <Login />
        </AuthProvider>)

        await login()

        expect(navigateMock).toHaveBeenCalledWith('/redirectUrl')
    })

    it('Login redirects to piid from permissions', async () => {
        mockAdapter.useLocation = () => ['http://localhost:5137/login', navigateMock]
        render(<AuthProvider adapter={mockAdapter}>
            <Login />
        </AuthProvider>)

        await login()

        expect(navigateMock).toHaveBeenCalledWith('/22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })
})