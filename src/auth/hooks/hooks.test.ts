import { describe, expect, it, Mock, test, vi } from 'vitest';
import { createMockAuthAdapter, mockGetPermissions, mockLogin, mockNavigate, mockSetInstances, mockSetToken, mockSetUserName } from '../__test__/mockAdapter';

vi.mock('../useAdapter')
import { renderHook } from '@testing-library/react';
import { useLogin } from './useLogin';
import { useAdapter } from '../useAdapter';
import { useLogout } from './useLogout';
import { useActiveInstance, useGetPermissions } from './usePermissions';


describe('useLogin', () => {
    it('Login', async () => {
        mockLogin.mockResolvedValue({ token: '12345' })
        const mockAdapter = createMockAuthAdapter()
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useLogin())

        // eslint-disable-next-line sonarjs/no-hardcoded-passwords
        const ok = await result.current({ userName: 'name', password: 'pw' })
        expect(ok).toBeTruthy()
        expect(mockSetToken).toHaveBeenCalledWith('12345')
        expect(mockSetUserName).toHaveBeenCalledWith('name')
    })

    it('Login fails', async () => {
        mockLogin.mockRejectedValue({ status: 401 })
        const mockAdapter = createMockAuthAdapter()
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)


        const { result } = renderHook(() => useLogin())

        // eslint-disable-next-line sonarjs/no-hardcoded-passwords
        const ok = await result.current({ userName: 'name', password: 'pw' })
        expect(ok).toBeFalsy()
        expect(mockSetToken).not.toHaveBeenCalled()
        expect(mockSetUserName).not.toHaveBeenCalled()
    })
})

describe('useLogout', () => {
    it('coming from URL', () => {
        const mockAdapter = createMockAuthAdapter({
            useLocation: () => ({ location:'/abc', navigate:mockNavigate }),
        })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useLogout())

        result.current()

        expect(mockSetToken).toHaveBeenCalledWith('')
        expect(mockSetUserName).toHaveBeenCalledWith('')
        expect(mockNavigate).toHaveBeenCalled()
    })

})

test('useGetPermissions', async () => {
    mockGetPermissions.mockResolvedValue({ instances: [{ piid: '123', product: 'shopping-list', appMapping: {} }], userName: 'user 1', userId: '123' })
    const mockAdapter = createMockAuthAdapter({

    })
        ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useGetPermissions())
    await result.current()

    expect(mockSetInstances).toHaveBeenCalledWith([{ id: '123', productId: 'shopping-list', productName: 'Einkaufsliste', selected: false, url: 'http://localhost:5173' }])
    expect(mockSetUserName).toHaveBeenCalledWith('user 1')
})


describe('useActiveInstance', () => {
    it('only one instance', () => {
        const mockAdapter = createMockAuthAdapter({
            useProductInstances: () => ({ instances: [{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }], setInstances: mockSetInstances }),
            useProductKey: () => 'shopping-list',
            useLocation: () => ({ location: '/22990bce-4968-46c6-bcc8-6654f8a5cf35', navigate: mockNavigate }),

        })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useActiveInstance())
        const activeInstance = result.current
        expect(activeInstance?.id).toBe('22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })

    it('multiple instances, only one id in url', () => {
        const mockAdapter = createMockAuthAdapter({
            useProductInstances: () => ({ instances: [
                { id: 'b1ee8974-85cf-4952-bed9-672a84318e5b', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' },
                { id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' },
            ], setInstances: mockSetInstances }),
            useProductKey: () => 'shopping-list',
            useLocation: () => ({ location:'/22990bce-4968-46c6-bcc8-6654f8a5cf35', navigate: mockNavigate }),

        })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useActiveInstance())
        const activeInstance = result.current
        expect(activeInstance?.id).toBe('22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })

    it('no instance in URL, take first', () => {
        const mockAdapter = createMockAuthAdapter({
            useProductInstances: () => ({ instances: [
                { id: 'b1ee8974-85cf-4952-bed9-672a84318e5b', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' },
                { id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' },
            ], setInstances: mockSetInstances }),
            useProductKey: () => 'shopping-list',
            useLocation: () => ({ location: '/login', navigate: mockNavigate }),

        })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useActiveInstance())
        const activeInstance = result.current
        expect(activeInstance?.id).toBe('b1ee8974-85cf-4952-bed9-672a84318e5b')
    })

    it('no instance in URL, take fitting product', () => {
        const mockAdapter = createMockAuthAdapter({
            useProductInstances: () => ({ instances: [
                { id: 'b1ee8974-85cf-4952-bed9-672a84318e5b', productId: 'hista-complete', productName: 'Hista', url: '' },
                { id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' },
            ], setInstances: mockSetInstances }),
            useProductKey: () => 'shopping-list',
            useLocation: () => ({ location: '/login', navigate: mockNavigate }),

        })
            ; (useAdapter as unknown as Mock).mockReturnValue(mockAdapter)

        const { result } = renderHook(() => useActiveInstance())
        const activeInstance = result.current
        expect(activeInstance?.id).toBe('22990bce-4968-46c6-bcc8-6654f8a5cf35')
    })
})