import { describe, expect, it, vi } from 'vitest';
import { Login } from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../auth';
import { createMockAdapter, mockLogin, mockNavigate } from '../auth/__test__/mockAdapter';




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
        const mockAdapter = createMockAdapter({ useLocation: () => ['http://localhost:5137/22990bce-4968-46c6-bcc8-6654f8a5cf35/login?redirectTo=/redirectUrl', mockNavigate] })

        render(<AuthProvider adapter={mockAdapter}>
            <Login />
        </AuthProvider>)

        await login()

        expect(mockNavigate).toHaveBeenCalledWith('/redirectUrl')
    })

    it('Login redirects to piid from permissions', async () => {
        mockLogin.mockResolvedValueOnce({ token: '123' })
        const mockAdapter = createMockAdapter({
            useLocation: () => ['http://localhost:5137/login', mockNavigate],
            useProductInstances: () => [[{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }], vi.fn()],
        })
        render(<AuthProvider adapter={mockAdapter}>
            <Login />
        </AuthProvider>)

        await login()

        expect(mockNavigate).toHaveBeenCalledWith('/22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })

    it('Login fails', async () => {
        mockLogin.mockRejectedValue({ status: 401 })
        const mockAdapter = createMockAdapter({
            useLocation: () => ['http://localhost:5137/login', mockNavigate],
            useProductInstances: () => [[{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }], vi.fn()],
        })
        render(<AuthProvider adapter={mockAdapter}>
            <Login />
        </AuthProvider>)

        await login()

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})