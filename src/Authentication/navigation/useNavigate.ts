import { useLocation } from 'wouter'
import { useEffect } from 'react'


export const useNavigateLogin = () => {
    const [location, navigate] = useLocation()

    useEffect(() => {
        if (!location.startsWith('/login')) {
            navigate(`/login?redirectTo=${location}`)
        }
    }, [location, navigate])
}

// // Navigates to redirectTo or the first valid piid of this product
// export const useNavigateAfterLogin = (productKey: ProductKey) => {
//     const [, navigate] = useLocation()
//     const [searchParams] = useSearchParams()

//     const redirectTo = searchParams.get('redirectTo')
//     if (redirectTo) {
//         const redirectUrl = redirectTo.startsWith('/') ? redirectTo : '/' + redirectTo
//         navigate(redirectUrl)
//         return
//     }

//     const instance = useActiveInstance(productKey)
//     if (instance) {
//         navigate(instance.id)
//         return
//     }
// }
