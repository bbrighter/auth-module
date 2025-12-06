import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserManagement } from './UserManagement'
import userEvent from '@testing-library/user-event';

describe('user management', () => {
    const mockApi = {
        AddUserToProductInstance: async (_name: string) => ({ id: '999' }),
        GetUsersForProductInstance: async () => ({ users: [{ name: 'name', id: '123' }] }),
        RemoveUserFromProductInstance: async (_name: string) => { },
    }

    it('renders', async () => {
        render(<UserManagement api={mockApi} />)

        expect(await screen.findByText('Nutzerverwaltung')).toBeInTheDocument()
    })

    it('delete', async () => {
        render(<UserManagement api={mockApi} />)

        const user = await screen.findByText('name')
        expect(user).toBeInTheDocument()
        const userDeleteButton = screen.getByTestId('deleteUser')
        expect(userDeleteButton).toBeInTheDocument()

        await userEvent.click(userDeleteButton)
        expect(screen.queryByText('name')).not.toBeInTheDocument()
    })

    it('invite', async () => {
        render(<UserManagement api={mockApi} />)

        const inviteInput = await screen.findByLabelText('Nutzer einladen')
        expect(inviteInput).toBeInTheDocument()
        await userEvent.type(inviteInput, 'new user')

        const inviteButton = screen.getByText('Einladen')
        await userEvent.click(inviteButton)
        expect(screen.getAllByTestId('deleteUser')).toHaveLength(2)
    })
})