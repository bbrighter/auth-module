import { createStore } from 'jotai';
import { describe, expect, it, test, vi } from 'vitest';
import { apiAtom, locationAtom, productInstancesAtom, tokenAtom, usernameAtom } from './atoms';
import { selectedProductInstanceAtom } from './selectors';
import { getPermissionsAtom, loginAtom, logoutAtom } from './actions';
import { createTestStore } from '../../__test__/testUtils';
import { AuthApi } from '../interface';

describe('selectors', () => {
    describe('selected product instance atom', () => {

        const instances = [{
            id: 'f1857897-25c4-4229-9ec0-15b01f109f56',
            productId: 'shopping-list',
            productName: 'Einkaufsliste',
            url: 'blabla',
        },
        {
            id: 'f29565f9-bb1b-44a4-9926-34792f7644f5',
            productId: 'shopping-list',
            productName: 'Einkaufsliste',
            url: 'blabla',
        }]
        const defaultLocation = { pathname: '/', search: '', hash: '' }
        let store: ReturnType<typeof createStore>

        it('no guid in url, pick first', () => {
            store = createTestStore([[locationAtom, defaultLocation], [productInstancesAtom, instances]])

            const selectedInstance = store.get(selectedProductInstanceAtom)
            expect(selectedInstance?.id).toBe('f1857897-25c4-4229-9ec0-15b01f109f56')
        })

        it('url guid exists, pick fitting', () => {
            store = createTestStore([[locationAtom, { pathname: '/f29565f9-bb1b-44a4-9926-34792f7644f5' }], [productInstancesAtom, instances]])
            const selectedInstance = store.get(selectedProductInstanceAtom)
            expect(selectedInstance?.id).toBe('f29565f9-bb1b-44a4-9926-34792f7644f5')
        })

        it('url guid, but not in permissions, pick first from permissions', () => {
            store = createTestStore([[locationAtom, { pathname: '/b0a08c0b-a50d-4f4d-a308-4b2d949d7c66' }], [productInstancesAtom, instances]])

            const selectedInstance = store.get(selectedProductInstanceAtom)
            expect(selectedInstance?.id).toBe('f1857897-25c4-4229-9ec0-15b01f109f56')
        })
    })

})


describe('actions', () => {
    let store: ReturnType<typeof createStore>

    describe('login', () => {
        const mockApi: AuthApi = {
            Login: vi.fn().mockResolvedValue({ token: '123' }),
            GetPermissions: vi.fn(),
        }

        it('success', async () => {
            store = createTestStore([[apiAtom, mockApi]])
            const login = await store.set(loginAtom, { userName: 'name', password: 'password' })

            expect(login).toBeTruthy()

            const userName = store.get(usernameAtom)
            expect(userName).toBe('name')

            const token = store.get(tokenAtom)
            expect(token).toBe('123')
        })

        it('failed login', async () => {
            mockApi.Login = vi.fn().mockRejectedValueOnce(new Error('error'))
            store = createTestStore([[apiAtom, mockApi]])

            const login = await store.set(loginAtom, { userName: 'name', password: 'password' })

            expect(login).toBeFalsy()
        })
    })

    test('logout', () => {
        store = createTestStore([[tokenAtom, '123'], [usernameAtom, 'name']])

        store.set(logoutAtom)

        const token = store.get(tokenAtom)
        expect(token).toBe('')

        const userName = store.get(usernameAtom)
        expect(userName).toBe('')
    })

    describe('get permissions atom', () => {
        const mockApi: AuthApi = {
            Login: vi.fn(),
            GetPermissions: vi.fn().mockResolvedValue({
                instances: [{ piid: '1234', product: 'shopping-list' }],
                userName: 'user name',
                userId: '',
            }),
        }

        it('get permissions', async () => {
            store = createTestStore([[apiAtom, mockApi]])

            await store.set(getPermissionsAtom)

            const instances = store.get(productInstancesAtom)
            expect(instances).toHaveLength(1)
            const instance = instances[0]
            expect(instance.id).toBe('1234')
            expect(instance.productId).toBe('shopping-list')
            expect(instance.productName).toBe('Einkaufsliste')

            const username = store.get(usernameAtom)
            expect(username).toBe('user name')
        })
    })
})