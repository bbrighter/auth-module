import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { AuthApi } from '../interface';
import { ProductInstance, ProductKey } from './types';
import { atomWithLocation } from 'jotai-location';

const storage = {
    getItem: (key: string, initialVal: string) => { return window.localStorage.getItem(key) || initialVal },
    setItem: (key: string, val: string) => { window.localStorage.setItem(key, val) },
    removeItem: (key: string) => { window.localStorage.removeItem(key) },
}

export const tokenAtom = atomWithStorage('new-token', '', storage)
export const authApiAtom = atom<AuthApi | null>(null)
export const usernameAtom = atom('')
export const productInstancesAtom = atom<Array<ProductInstance>>([])
export const locationAtom = atomWithLocation()
export const productKeyAtom = atom<ProductKey | null>(null)