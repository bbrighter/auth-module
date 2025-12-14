import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomAppBar } from './AppBar';
import userEvent from '@testing-library/user-event';
import { ProductInstance } from '../auth';

const mockLogout = vi.fn()

describe('app bar', () => {

    vi.mock('../auth', () => ({
        useAuth: () => ({
            userName: 'user 1',
            logout: mockLogout,
            permissions: [
                { id: '123', productId: 'shopping-list', productName: 'Einkaufsliste', url: 'url1' },
                { id: 'ABC', productId: 'hista-complete', productName: 'Hista', url: 'url2' },
            ] satisfies ProductInstance[],
        }),
    }))
    vi.mock('../users', () => ({
        useUserMgmt: () => ({
            users: [{ id: '1', name: 'name' }],
            avatarProps: vi.fn(),
            setUsers: vi.fn(),
        }),
    }))

    beforeEach(() => {
        vi.resetAllMocks()
    })


    it('renders', async () => {
        render(<CustomAppBar />)

        const avatarMenu = await screen.findByText('U1')
        expect(avatarMenu).toBeInTheDocument()
        await userEvent.click(avatarMenu)
        expect(screen.getByText('Einkaufsliste')).toBeInTheDocument()
    })

    it('logout', async () => {
        render(<CustomAppBar />)

        const avatarMenu = await screen.findByText('U1')
        expect(avatarMenu).toBeInTheDocument()
        await userEvent.click(avatarMenu)

        const logoutButton = screen.getByText('Logout')
        await userEvent.click(logoutButton)
        expect(mockLogout).toHaveBeenCalled()
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
