import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useClearCoupon, useGetCoupon, useUpdateCoupon } from '@/hooks/use-coupons'
import { cn } from '@/lib/utils'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const UpdateCoupon: React.FC = () => {
    // id
    const { id } = useParams()
    // states
    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const [expireDate, setExpireDate] = useState<Date>()

    // get single coupon query
    const { data, isLoading, error, isSuccess } = useGetCoupon(id)
    // update coupon mutation
    const { mutate: updateCoupon, isPending: isUpdating } = useUpdateCoupon()
    //  clear coupon mutation
    const { mutate: clearCoupon, isPending: isClearing } = useClearCoupon()
    const handleErrors = useHandleErrors()
    function handleUpdateCoupon(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const infos = {
            ...(name && name !== data?.coupon.name && { name }),
            ...(amount && amount !== data?.coupon.amount && { amount }),
            ...(expireDate &&
                expireDate !== data?.coupon.expireDate && { expireDate: new Date(expireDate) }),
        }
        updateCoupon({ id, infos })
    }
    useEffect(() => {
        if (isSuccess) {
            const { coupon } = data
            setName(coupon.name!)
            setAmount(coupon.amount!)
            setExpireDate(coupon.expireDate)
        }
    }, [isSuccess, data])

    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (error) handleErrors(error)
    if (data) {
        const { coupon } = data
        return (
            <Transition>
                <Helmet>
                    <title>Update Coupon</title>
                </Helmet>
                <Card>
                    <CardHeader className="flex flex-col items-start">
                        <h1 className="text-2xl font-medium text-primary ">Update Coupon</h1>
                        <span className="text-xs text-muted-foreground">
                            Created by <strong>{coupon.createdBy!.username}</strong>, at{' '}
                            {format(new Date(coupon.createdAt!), 'dd MMM yyyy')}
                        </span>
                        {coupon.updatedBy && (
                            <span className="text-xs text-muted-foreground">
                                Update by <strong>{coupon.updatedBy.username}</strong>, at{' '}
                                {format(new Date(coupon.updatedAt!), 'dd MMM yyyy')}
                            </span>
                        )}
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>
                                Used by <strong>{coupon.usedBy.length}</strong> user
                                {coupon.usedBy.length > 1 && 's'}
                            </span>
                            <Button
                                size="sm"
                                variant={null}
                                className={cn(
                                    'h-6 bg-red-500 text-white text-xs',
                                    coupon.usedBy.length == 0 && 'hidden'
                                )}
                                disabled={isClearing}
                                onClick={() => clearCoupon({ id })}
                            >
                                {isClearing ? <BeatLoader size={5} color="white" /> : 'Clear'}
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form className="space-y-4" onSubmit={handleUpdateCoupon}>
                            <Box className="flex flex-col space-y-3">
                                <Label htmlFor="name">Coupon Code</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="COuPoN"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>

                            <Box className="flex flex-col space-y-3">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    placeholder="10"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </Box>

                            <Box className="flex w-fit flex-col space-y-3">
                                <Label htmlFor="expireDate">Expire Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'max-w-[280px] justify-start text-left font-normal',
                                                !expireDate && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {expireDate ? (
                                                format(expireDate, 'dd-M-yyyy')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={expireDate}
                                            onSelect={(date) => setExpireDate(date as Date)}
                                            className="rounded-md border shadow"
                                            classNames={{
                                                day_today: 'border-2',
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Box>

                            <Button type="submit" className="!mt-10" disabled={isUpdating}>
                                {isUpdating ? (
                                    <BeatLoader color="white" size={13} />
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Transition>
        )
    }
}

export default UpdateCoupon
