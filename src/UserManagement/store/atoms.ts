import { atom } from 'jotai';
import { User } from './types';
import { UserAPI } from '../interface';

export const usersAtom = atom<Array<User>>([])
export const userApiAtom = atom<UserAPI | null>(null)

