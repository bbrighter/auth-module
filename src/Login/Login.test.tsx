import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AuthProvider } from '../auth'
import { createMockAuthAdapter, mockLogin, mockNavigate } from '../auth/__test__/mockAdapter'
import { Login } from './Login'

describe('Login', () => {
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
        mockLogin.mockResolvedValueOnce({ token: '123' })
        const mockAdapter = createMockAuthAdapter({ useLocation: () => ({ location: '/22990bce-4968-46c6-bcc8-6654f8a5cf35/login?redirectTo=/redirectUrl', navigate: mockNavigate }) })

        render(
            <AuthProvider adapter={mockAdapter}>
                <Login />
            </AuthProvider>,
        )

        await login()

        expect(mockNavigate).toHaveBeenCalledWith('/redirectUrl')
    })

    it('Login redirects to piid from permissions', async () => {
        mockLogin.mockResolvedValueOnce({ token: '123' })
        const mockAdapter = createMockAuthAdapter({
            useLocation: () => ({ location: '/login', navigate: mockNavigate }),
            useProductInstances: () => ({
                instances: [{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }],
                setInstances: vi.fn(),
                isLoaded: true,
                setIsLoaded: vi.fn(),
            }),
        })
        render(
            <AuthProvider adapter={mockAdapter}>
                <Login />
            </AuthProvider>,
        )

        await login()

        expect(mockNavigate).toHaveBeenCalledWith('/22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })

    it('Login fails', async () => {
        mockLogin.mockRejectedValue({ status: 401 })
        const mockAdapter = createMockAuthAdapter({
            useLocation: () => ({ location: '/login', navigate: mockNavigate }),
            useProductInstances: () => ({
                instances: [{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }],
                setInstances: vi.fn(),
                isLoaded: true,
                setIsLoaded: vi.fn(),
            }),
        })
        render(
            <AuthProvider adapter={mockAdapter}>
                <Login />
            </AuthProvider>,
        )

        await login()

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
