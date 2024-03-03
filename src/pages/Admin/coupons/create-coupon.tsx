import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreateCoupon } from '@/hooks/use-coupons'
import { cn } from '@/lib/utils'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'

const CreateCoupon = () => {
    const [expireDate, setExpireDate] = useState<Date>(new Date())
    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const handleErrors = useHandleErrors()
    // create coupon mutation
    const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon()
    function handleCreateCoupon(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!name || !amount || !expireDate) {
            let errorMessage: string = ''
            if (!expireDate || expireDate < new Date()) errorMessage += '\nExpire Date is required.'
            if (!amount) errorMessage += '\nAmount is required.'
            if (!name) errorMessage += '\nName is required.'
            return handleErrors(new Error(errorMessage))
        }
        createCoupon({ name, amount, expireDate: new Date(expireDate) })
    }

    return (
        <Transition>
            <Card>
                <CardHeader className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl">
                    Create Coupon
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleCreateCoupon}>
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
                                            'w-[280px] justify-start text-left font-normal',
                                            !expireDate && 'text-muted-foreground'
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {expireDate ? format(expireDate, 'PPP') : <span>Pick a date</span>}
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

                        <Button type="submit" className="!mt-10" disabled={isCreating}>
                            {isCreating ? <BeatLoader size={13} color="white" /> : 'Create Coupon'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Transition>
    )
}

export default CreateCoupon
