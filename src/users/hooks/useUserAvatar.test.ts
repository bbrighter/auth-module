import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../useAdapter')

import { useUserAvatar } from './useUserAvatar'

describe('useUserAvatar', () => {
    it('some name', () => {
        const { result } = renderHook(() => useUserAvatar('name'))
        const sx = result.current

        expect(sx.children).toBe('N')
        expect(sx.sx.bgcolor).toBe('#8b7a33')
    })

    it('julia', () => {
        const { result } = renderHook(() => useUserAvatar('Julia'))
        const sx = result.current

        expect(sx.children).toBe('J')
        expect(sx.sx.bgcolor).toBe('#4169E1')
    })
})