import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { OrderItemProps } from '@/types'
import React from 'react'
import { BiShekel } from 'react-icons/bi'
import { Link } from 'react-router-dom'

type Props = {
    products: OrderItemProps[]
}

const OrderProducts: React.FC<Props> = ({ products }) => {
    const {
        currentUser: { role },
    } = useUserContext()

    return (
        <Table className="text-sm">
            <TableHeader>
                <TableRow className="text-left text-base">
                    <TableHead className="truncate">Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product._id}>
                        <TableCell>
                            {role === 'Admin' ? (
                                <div className="flex items-center gap-3 p-1 w-[240px] truncate">
                                    <img
                                        src={product.productId.mainImage?.secure_url}
                                        className="size-12 min-w-12 object-cover circle transition-all"
                                        alt={product.productId.name}
                                    />
                                    <p className="capitalize text-base max-sm:text-xs font-semibold truncate w-[180px]">
                                        {product.productId.name}
                                    </p>
                                </div>
                            ) : (
                                <Link
                                    to={`/product/${product.productId.slug}`}
                                    className="flex items-center gap-3 group hover:text-primary p-1 w-[240px] truncate"
                                >
                                    <img
                                        src={product.productId.mainImage?.secure_url}
                                        className="size-12 min-w-12 object-cover circle group-hover:ring-[1.5px] group-hover:ring-primary transition-all"
                                        alt={product.productId.name}
                                    />
                                    <p className="capitalize text-base max-sm:text-xs font-semibold truncate w-[180px]">
                                        {product.productId.name}
                                    </p>
                                </Link>
                            )}
                        </TableCell>
                        <TableCell>
                            <p
                                className={cn(
                                    'text-base max-sm:text-xs font-semibold capitalize',
                                    !product.size && 'text-red-500 font-medium'
                                )}
                            >
                                {product.size ? product.size : 'N/A'}
                            </p>
                        </TableCell>
                        <TableCell>
                            <p
                                className={cn(
                                    'text-base max-sm:text-xs',
                                    !product.color ? 'text-red-500 font-medium' : 'size-8 circle'
                                )}
                                style={{
                                    backgroundColor: product.color,
                                }}
                            >
                                {!product.color && 'N/A'}
                            </p>
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                            <Flex $items="center" $gap="sm" className="text-base max-sm:text-sm">
                                <BiShekel />
                                <span>{product.unitPrice}</span>
                            </Flex>
                        </TableCell>
                        <TableCell>
                            <Flex $items="center" $gap="sm" className="text-base max-sm:text-sm">
                                <BiShekel />
                                <span>{product.finalPrice}</span>
                            </Flex>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrderProducts
