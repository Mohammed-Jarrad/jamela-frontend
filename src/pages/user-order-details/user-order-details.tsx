import Alert from '@/components/alert'
import Container from '@/components/my/container'
import OrderStatus from '@/components/my/order-status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/UserContextProvider'
import { useCancelOrder, useGetOrder } from '@/hooks/use-orders'
import { Flex } from '@/styles/styles'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { BiShekel } from 'react-icons/bi'
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi'
import { IoMdPricetag } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import OrderCouponSection from './components/order-coupon-section'
import OrderNoteSection from './components/order-note-section'
import OrderProducts from './components/order-products'
import OrderReasonRejectedSection from "./components/order-reason-rejected-section"

const UserOrderDetails = () => {
    const { id: orderId } = useParams()
    const { data, isLoading, error } = useGetOrder({ orderId: orderId! })
    const handleErrors = useHandleErrors()
    const actualPrice = data?.order.products.reduce((acc, curr) => acc + curr.finalPrice, 0) || 0
    const { mutate: cancel, isPending: isCancelling } = useCancelOrder()
    const { currentUser } = useUserContext()

    function handleCancleOrder(orderId: string) {
        cancel(orderId)
    }
    if (error) {
        handleErrors(error)
    }
    if (isLoading || !data) {
        return <OrderLoaderPlaceholder />
    }
    return (
        <Container className="my-6 sm:my-12">
            <Card>
                <CardHeader className="space-y-3 border-b">
                    {/* User & Order Info */}
                    <Flex $items="center" className="w-full max-md:!flex-col max-md:!items-center">
                        <img
                            src={data.order.userId.image!.secure_url}
                            alt=""
                            className="size-14 object-cover rounded-2xl shadow"
                        />
                        <div className="flex flex-col items-start max-md:items-center gap-1 w-full">
                            <div className="capitalize flex flex-col items-center gap-1 md:flex-row">
                                <span>{data.order.userId.username}</span>
                                <OrderStatus status={data.order.status} />
                            </div>

                            <div className="text-xs text-muted-foreground flex flex-col max-md:items-center flex-wrap gap-x-2 gap-y-1">
                                <p className="flex items-center gap-1 w-full">
                                    <HiMail className="text-primary size-4" />
                                    <Link
                                        className="hover:underline"
                                        to={`mailto:${data.order.userId.email}`}
                                    >
                                        {data.order.userId.email}
                                    </Link>
                                </p>
                                <p className="flex items-center gap-1">
                                    <HiLocationMarker className="text-primary size-4" />
                                    {data.order.address}
                                </p>
                                <p className="flex items-center gap-1">
                                    <HiPhone className="text-primary size-4" />
                                    <Link
                                        className="hover:underline"
                                        to={`tel:${data.order.phoneNumber}`}
                                    >
                                        {data.order.phoneNumber}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Flex>
                    {/* order id, status */}
                    <div className="flex flex-col items-center gap-1 md:justify-between md:flex-row">
                        <div className="flex flex-col items-center gap-1 md:flex-row">
                            <span className="font-medium text-foreground/90 text-sm">
                                {data.order._id}
                            </span>
                            <span className="capitalize text-muted-foreground">
                                ({data.order.products.length} item
                                {data.order.products.length > 1 ? 's' : ''})
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {new Date(data.order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-5 max-sm:text-xs">
                        {/* Products */}
                        <OrderProducts products={data.order.products} />

                        {/* Coupon */}
                        <OrderCouponSection order={data.order} />

                        {/* Price */}
                        <Box className="space-y-2">
                            <div className="flex items-center justify-between">
                                <b className="text-muted-foreground flex items-center gap-1">
                                    <IoMdPricetag size={18} color="hsl(var(--primary))" /> Total
                                </b>
                                <div className="flex items-center gap-2">
                                    {data.order.couponName && (
                                        <span>
                                            <BiShekel className="inline-block" />
                                            <span className="line-through text-muted-foreground">
                                                {actualPrice}
                                            </span>
                                        </span>
                                    )}
                                    <b className="text-foreground">
                                        <BiShekel className="inline-block" />
                                        {data.order.finalPrice}
                                    </b>
                                </div>
                            </div>
                        </Box>

                        {/* Note */}
                        <OrderNoteSection order={data.order} />

                        {/* Reson for cancelling */}
                        {data.order.reasonRejected && (
                            <OrderReasonRejectedSection order={data.order} />
                        )}

                        {/* Buttons */}
                        {data.order.status === 'pending' && currentUser.role == 'User' && (
                            <Alert
                                onConfirm={() => handleCancleOrder(data.order._id)}
                                description={
                                    <>
                                        Are you sure you want to cancel this order? <br />
                                        This action cannot be undone.
                                    </>
                                }
                                className=""
                            >
                                <Button
                                    variant={'destructive'}
                                    className="max-sm:w-full ml-auto block w-56"
                                >
                                    {isCancelling ? (
                                        <BeatLoader size={7} color="hsl(var(--primary))" />
                                    ) : (
                                        'Cancel Order'
                                    )}
                                </Button>
                            </Alert>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default UserOrderDetails

export const OrderLoaderPlaceholder = () => (
    <div className="space-y-2 container my-12">
        <div className="flex items-center gap-2 mt-3">
            <Skeleton className="size-14 circle" />
            <Skeleton className="w-full h-20 square" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Skeleton className="w-full h-32 square" />
            <Skeleton className="w-full h-32 square" />
        </div>
        <Skeleton className="w-full h-16 square" />
        <Skeleton className="w-full h-16 square" />
        <Skeleton className="w-full h-16 square" />
        <Skeleton className="w-full h-16 square" />
    </div>
)
