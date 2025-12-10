import { atom } from 'jotai'
import { locationAtom, productInstancesAtom, productKeyAtom } from './atoms'

export const selectedProductInstanceAtom = atom((get) => {
    const product = get(productKeyAtom)
    const instances = get(productInstancesAtom)
    const location = get(locationAtom)
    const urlId = location.pathname?.split('/')[1]

    const urlPiid = urlId && isGuid(urlId) ? urlId : undefined

    if (urlPiid) {
        return instances.find(i => i.id == urlPiid) ?? instances.at(0)
    }
    return instances.find(i => i.productId == product) ?? instances.at(0)
})

const isGuid = (testString: string | undefined): boolean => {
    const guidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    return testString != undefined && guidRegex.test(testString)
}

export const piidAtom = atom((get) => {
    const instance = get(selectedProductInstanceAtom)
    return instance?.id
})