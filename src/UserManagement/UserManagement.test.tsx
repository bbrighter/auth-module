import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import { UserManagement } from './UserManagement'
import userEvent from '@testing-library/user-event';

import { ReactNode, useState } from 'react';
import { UserAPI, UserStateAdapter } from '../users/interface';
import { UserManagementProvider } from '../users/UserManagementProvider';


const useMockAdapter = (apiOverrides?: Partial<UserAPI>) => {
    const [users, setUsers] = useState([
        { name: 'name', id: '123' },
        { name: 'not me', id: 'ABC' },
    ])
    const mockApi: UserAPI = {
        AddUserToProductInstance: vi.fn().mockResolvedValue({ id: '999' }),
        GetUsersForProductInstance: vi.fn().mockResolvedValue({ users }),
        RemoveUserFromProductInstance: vi.fn(),
    }

    const api = { ...mockApi, ...apiOverrides }

    const adapter: UserStateAdapter = {
        useApi: () => api,
        useUsers: () => ({ users, setUsers }),
        usePiid: vi.fn(),
    }

    return adapter
}

const TestWrapper = ({ children, apiOverrides }: { children: ReactNode, apiOverrides?: Partial<UserAPI> }) => {
    const adapter = useMockAdapter(apiOverrides)
    return <UserManagementProvider adapter={adapter}>{children}</UserManagementProvider>
}

describe('user management', () => {
    it('renders', async () => {
        render(<TestWrapper><UserManagement currentUserName='name' /></TestWrapper>)

        expect(await screen.findByText('Nutzerverwaltung')).toBeInTheDocument()
    })

    it('delete', async () => {
        render(<TestWrapper><UserManagement currentUserName='name' /></TestWrapper>)

        const user = await screen.findByText('not me')
        expect(user).toBeInTheDocument()
        const userRow = user.closest('li')!
        const userDeleteButton = within(userRow).getByTestId('deleteUser')
        expect(userDeleteButton).toBeInTheDocument()

        await userEvent.click(userDeleteButton)
        await waitFor(() => {
            expect(screen.queryByText('not me')).not.toBeInTheDocument()
        })
    })

    it('delete myself not possible', async () => {
        render(<TestWrapper><UserManagement currentUserName='name' /></TestWrapper>)

        const user = await screen.findByText('name')
        expect(user).toBeInTheDocument()
        const userRow = user.closest('li')!
        const userDeleteButton = within(userRow).getByTestId('deleteUser')
        expect(userDeleteButton).toBeInTheDocument()
        expect(userDeleteButton).toBeDisabled()
    })

    it('invite', async () => {
        render(<TestWrapper><UserManagement currentUserName='name' /></TestWrapper>)

        const inviteInput = await screen.findByLabelText('Nutzer einladen')
        expect(inviteInput).toBeInTheDocument()
        await userEvent.type(inviteInput, 'new user')

        const inviteButton = screen.getByText('Einladen')
        await userEvent.click(inviteButton)
        expect(screen.getAllByTestId('deleteUser')).toHaveLength(3)
    })

    it('invite, but not found', async () => {
        render(<TestWrapper apiOverrides={{ AddUserToProductInstance: vi.fn().mockRejectedValue({ status: 404 }) }} > <UserManagement currentUserName='name' /></TestWrapper >)

        const inviteInput = await screen.findByLabelText('Nutzer einladen')
        expect(inviteInput).toBeInTheDocument()
        await userEvent.type(inviteInput, 'new user')

        const inviteButton = screen.getByText('Einladen')
        await userEvent.click(inviteButton)
        expect(screen.getAllByTestId('deleteUser')).toHaveLength(2)
        expect(screen.getByText('Nutzer existiert nicht')).toBeInTheDocument()
    })
})