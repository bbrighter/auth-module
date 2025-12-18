import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomAppBar } from './AppBar';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../auth';

const mockLogout = vi.fn()

const defaultMockUseAuth: ReturnType<typeof useAuth> = {
    userName: 'user 1',
    logout: mockLogout,
    token: 'token',
    permissions: [
        { id: '123', productId: 'shopping-list', productName: 'Einkaufsliste', url: 'url1' },
        { id: 'ABC', productId: 'hista-complete', productName: 'Hista', url: 'url2' },
    ],
    activeInstance: { id: '1', productId: '', productName: '', url: '' },
    login: vi.fn(),
    navigate: vi.fn(),
    piid: '',
    setPermissions: vi.fn(),
}

vi.mock('../auth', () => ({ useAuth: vi.fn() }))

vi.mock('../users', () => ({
    useUserMgmt: () => ({
        users: [{ id: '1', name: 'name' }],
        avatarProps: vi.fn(),
        setUsers: vi.fn(),
    }),
}))

describe('app bar', () => {
    beforeEach(() => {
        vi.mocked(useAuth).mockReturnValue(defaultMockUseAuth)
        // vi.clearAllMocks()
    })


    it('renders', async () => {
        render(<CustomAppBar />)

        const avatarMenu = await screen.findByText('U1')
        expect(avatarMenu).toBeInTheDocument()
        await userEvent.click(avatarMenu)
        expect(screen.getByText('Einkaufsliste')).toBeInTheDocument()
    })

    describe('logout', () => {
        it('ok', async () => {
            render(<CustomAppBar />)

            const avatarMenu = await screen.findByText('U1')
            expect(avatarMenu).toBeInTheDocument()
            await userEvent.click(avatarMenu)

            const logoutButton = screen.getByText('Logout')
            await userEvent.click(logoutButton)
            expect(mockLogout).toHaveBeenCalled()
        })

        it('no token', async () => {
            vi.mocked(useAuth).mockReturnValue({
                ...defaultMockUseAuth,
                token: '',
            })

            render(<CustomAppBar />)

            const avatarMenu = await screen.findByText('U1')
            expect(avatarMenu).toBeInTheDocument()
            await userEvent.click(avatarMenu)

            const logoutButton = screen.getByText('Logout').closest('li')!
            expect(logoutButton).toHaveAttribute('aria-disabled', 'true')
        })
    })


    it('open user management', async () => {
        render(<CustomAppBar />)

        const avatarMenu = await screen.findByText('U1')
        expect(avatarMenu).toBeInTheDocument()
        await userEvent.click(avatarMenu)

        const userMgmtButton = screen.getByText('Benutzer')
        await userEvent.click(userMgmtButton)
        expect(screen.getByText('Nutzerverwaltung')).toBeInTheDocument()
    })

    it('change product instance', async () => {
        render(<CustomAppBar />)

        const avatarMenu = await screen.findByText('U1')
        expect(avatarMenu).toBeInTheDocument()
        await userEvent.click(avatarMenu)

        const shoppingList = screen.getByText('Einkaufsliste')
        expect(shoppingList).toBeInTheDocument()
        const shoppingListLink = shoppingList.closest('a')!
        expect(shoppingListLink).toHaveAttribute('href', 'url1/123')

        const hista = screen.getByText('Hista')
        expect(hista).toBeInTheDocument()
        const histaLink = hista.closest('a')!
        expect(histaLink).toHaveAttribute('href', 'url2/ABC')
    })
})
