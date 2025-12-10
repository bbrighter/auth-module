
import { createStore, WritableAtom } from 'jotai'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTestStore = (initialValues: [WritableAtom<any, any[], any>, any][]) => {
    const store = createStore()
    for (const [atom, value] of initialValues) {
        store.set(atom, value)
    }
    return store
}