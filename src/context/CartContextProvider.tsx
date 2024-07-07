import { useGetCurrentCart } from '@/hooks/api/use-cart'
import { CartProps } from '@/types'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { UseQueryResult } from '@tanstack/react-query'
import * as React from 'react'
import { useUserContext } from './UserContextProvider'

type CartContextProps = {
    cart: CartProps | null
    setCart: React.Dispatch<React.SetStateAction<CartProps | null>>
    cartQuery: UseQueryResult<CartProps, Error>
}

const CartContext = React.createContext<CartContextProps | null>(null)

type CartContextProviderProps = {
    children: React.ReactNode
}
const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const [cart, setCart] = React.useState<CartProps | null>(null)
    const { token, currentUser } = useUserContext()
    const cartQuery = useGetCurrentCart({
        enabled: !!(token && currentUser?.role === 'User'), // only fetch cart if user is logged in
    })
    const { data, error, isSuccess } = cartQuery
    const handleErrors = useHandleErrors()

    React.useEffect(() => {
        if (isSuccess) setCart(data)
    }, [data, isSuccess])

    if (error) handleErrors(error)

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                cartQuery,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

export const useCart = () => {
    const context = React.useContext(CartContext)
    if (context === null) {
        throw new Error('useCart must be used within a Cart Provider')
    }
    return context
}
