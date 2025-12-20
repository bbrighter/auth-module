import { renderHook } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { createMockAdapter, mockAddUserApi, mockGetUsersApi, mockRemoveUserApi, mockSetUsers } from '../__test__/mockAdapter';

vi.mock('../useAdapter')

import { useDeleteUser, useGetUsers, useInviteUser } from './useUsers';
import { useAdapter } from '../useAdapter';


describe('getUsers', () => {
    it('ok', async () => {
        mockGetUsersApi.mockResolvedValue({ users: [{ id: '123', name: 'user 1' }] })
        const mockAdapter = createMockAdapter()
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)
        const { result } = renderHook(() => useGetUsers())

        await result.current()

        expect(mockGetUsersApi).toHaveBeenCalled()
        expect(mockSetUsers).toHaveBeenCalledWith([{ id: '123', name: 'user 1' }])
    })

})

describe('useInviteUser', () => {
    it('ok', async () => {
        mockAddUserApi.mockResolvedValue({ id: '456' })
        const mockAdapter = createMockAdapter({ useUsers: () => ({ users: [], setUsers: mockSetUsers }) })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)
        const { result } = renderHook(() => useInviteUser())

        await result.current({ userName: 'name' })

        expect(mockAddUserApi).toHaveBeenCalled()
        expect(mockSetUsers).toHaveBeenCalledWith([{ id: '456', name: 'name' }])
    })

    it('not found', async () => {
        mockAddUserApi.mockRejectedValue({ status: 404 })
        const mockAdapter = createMockAdapter()
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)
        const { result } = renderHook(() => useInviteUser())

        const status = await result.current({ userName: 'name' })

        expect(mockAddUserApi).toHaveBeenCalled()
        expect(status).toBe(404)
    })
})

describe('useDeleteUser', () => {
    it('ok', async () => {
        const users = [{ id: '123', name: 'user 1' }, { id: '456', name: 'name' }]
        const mockAdapter = createMockAdapter({ useUsers: () => ({ users: users, setUsers: mockSetUsers }) })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)
        const { result } = renderHook(() => useDeleteUser())

        await result.current({ userName: 'name' })

        expect(mockRemoveUserApi).toHaveBeenCalledWith('ABC', 'name')
        expect(mockSetUsers).toHaveBeenCalledWith([{ id: '123', name: 'user 1' }])

    })
})

