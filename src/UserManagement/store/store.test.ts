import { describe, expect, it, vi } from 'vitest';
import { createTestStore } from '../../__test__/testUtils';
import { apiAtom, usersAtom } from './atoms';
import { deleteUserAtom, getUsersAtom, inviteUserAtom } from './actions';

describe('actions', () => {
    const mockApi = {
        // AddUserToProductInstance: async (_name: string) => ({ id: '1234' }),
        AddUserToProductInstance: vi.fn().mockResolvedValue({ id: '1234' }),
        GetUsersForProductInstance: vi.fn().mockResolvedValue({ users: [{ name: 'name', id: '456' }] }),
        RemoveUserFromProductInstance: vi.fn(),
    }

    it('getUserAtom', async () => {
        const store = createTestStore([[apiAtom, mockApi]])

        await store.set(getUsersAtom)

        const users = store.get(usersAtom)
        expect(users).toHaveLength(1)
        const user = users[0]
        expect(user.id).toBe('456')
        expect(user.name).toBe('name')
    })

    describe('inivteUserAtom', () => {
        it('success', async () => {
            const store = createTestStore([[apiAtom, mockApi]])

            await store.set(inviteUserAtom, { userName: 'new name' })

            const users = store.get(usersAtom)
            expect(users).toHaveLength(1)
            const user = users[0]
            expect(user.id).toBe('1234')
            expect(user.name).toBe('new name')
        })

        it('error', async () => {
            mockApi.AddUserToProductInstance = vi.fn().mockRejectedValueOnce({ status: 401 })
            const store = createTestStore([[apiAtom, mockApi]])

            const status = await store.set(inviteUserAtom, { userName: 'new name' })
            expect(status).toBe(401)
        })
    })


    it('deleteUserAtom', async () => {
        const store = createTestStore([[apiAtom, mockApi], [usersAtom, [{ name: 'name', id: '456' }]]])

        await store.set(deleteUserAtom, { userName: 'name' })

        const users = store.get(usersAtom)
        expect(users).toHaveLength(0)

    })
})