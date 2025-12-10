import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { UserManagement } from './UserManagement'
import userEvent from '@testing-library/user-event';
import { UserManagementProvider } from './UserManagementProvider';

describe('user management', () => {
    const mockApi = {
        AddUserToProductInstance: vi.fn().mockResolvedValue({ id: '999' }),
        GetUsersForProductInstance: vi.fn().mockResolvedValue({ users: [{ name: 'name', id: '123' }, { name: 'not me', id: 'ABC' }] }),
        RemoveUserFromProductInstance: vi.fn(),
    }

    it('renders', async () => {
        render(<UserManagementProvider api={mockApi}>
            <UserManagement currentUserName='name' />
        </UserManagementProvider>)

        expect(await screen.findByText('Nutzerverwaltung')).toBeInTheDocument()
    })

    it('delete', async () => {
        render(<UserManagementProvider api={mockApi}>
            <UserManagement currentUserName='name' />
        </UserManagementProvider>)

        const user = await screen.findByText('not me')
        expect(user).toBeInTheDocument()
        const userRow = user.closest('li')!
        const userDeleteButton = within(userRow).getByTestId('deleteUser')
        expect(userDeleteButton).toBeInTheDocument()

        await userEvent.click(userDeleteButton)
        expect(screen.queryByText('not me')).not.toBeInTheDocument()
    })

    it('delete myself not possible', async () => {
        render(<UserManagementProvider api={mockApi}>
            <UserManagement currentUserName='name' />
        </UserManagementProvider>)

        const user = await screen.findByText('name')
        expect(user).toBeInTheDocument()
        const userRow = user.closest('li')!
        const userDeleteButton = within(userRow).getByTestId('deleteUser')
        expect(userDeleteButton).toBeInTheDocument()
        expect(userDeleteButton).toBeDisabled()
    })

    it('invite', async () => {
        render(<UserManagementProvider api={mockApi}>
            <UserManagement currentUserName='name' />
        </UserManagementProvider>)

        const inviteInput = await screen.findByLabelText('Nutzer einladen')
        expect(inviteInput).toBeInTheDocument()
        await userEvent.type(inviteInput, 'new user')

        const inviteButton = screen.getByText('Einladen')
        await userEvent.click(inviteButton)
        expect(screen.getAllByTestId('deleteUser')).toHaveLength(3)
    })

    it('invite, but not found', async () => {
        mockApi.AddUserToProductInstance.mockRejectedValueOnce({ status: 404 })

        render(<UserManagementProvider api={mockApi}>
            <UserManagement currentUserName='name' />
        </UserManagementProvider>)

        const inviteInput = await screen.findByLabelText('Nutzer einladen')
        expect(inviteInput).toBeInTheDocument()
        await userEvent.type(inviteInput, 'new user')

        const inviteButton = screen.getByText('Einladen')
        await userEvent.click(inviteButton)
        expect(screen.getAllByTestId('deleteUser')).toHaveLength(2)
        expect(screen.getByText('Nutzer existiert nicht')).toBeInTheDocument()
    })
})