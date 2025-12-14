import { useActiveInstance } from '../hooks';

export const usePiid = () => {
    const instance = useActiveInstance()
    return instance?.id
}