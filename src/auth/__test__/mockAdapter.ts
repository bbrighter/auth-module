import { vi } from 'vitest'
import { AuthApi, AuthStateAdapter, ProductInstance } from '../interface'

export const mockLogin = vi.fn()
export const mockSetToken = vi.fn()
export const mockSetUserName = vi.fn()
export const mockNavigate = vi.fn()
export const mockGetPermissions = vi.fn()
export const mockSetInstances = vi.fn()

const createMockAuthApi = (overrides?: Partial<AuthApi>): AuthApi => ({
    Login: mockLogin,
    GetPermissions: mockGetPermissions,
    ...overrides,
})


export const createMockAuthAdapter = (overrides?: Partial<AuthStateAdapter>): AuthStateAdapter => ({
    useToken: () => ({ token: '123', setToken: mockSetToken }),
    useAuthApi: () => createMockAuthApi(),
    useUserName: () => ({ userName: 'user 1', setUserName: mockSetUserName }),
    useProductInstances: () => ({ instances: [{ id: '22990bce-4968-46c6-bcc8-6654f8a5cf35', productId: 'shopping-list', productName: 'Einkaufsliste', url: '' }] as Array<ProductInstance>, setInstances: mockSetInstances }),
    useProductKey: () => 'shopping-list',
    useLocation: () => ({ location: '/22990bce-4968-46c6-bcc8-6654f8a5cf35/login?redirectTo=/redirectUrl', navigate: mockNavigate }),
    ...overrides,
})
