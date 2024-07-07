import CustomInput from '@/components/my/custom-input'
import RequiredStar from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreateCoupon } from '@/hooks/api/use-coupons'
import { cn } from '@/lib/utils'
import { yupValidateForm } from '@/lib/yup-validate-form'
import Transition from '@/components/transition'
import { Box } from '@radix-ui/themes'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'

const CreateCoupon = () => {
    type DataProps = {
        name?: string
        amount?: number
        expireDate?: Date
    }
    const [data, setData] = useState<DataProps>({})

    // create coupon mutation
    const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon()
    function handleCreateCoupon(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const schema = Yup.object().shape({
            name: Yup.string().required('Name is required').max(10).min(3).label('Coupon Name'),
            amount: Yup.number().required('Amount is required'),
            expireDate: Yup.date().required('Expire date is required'),
        })
        if (!yupValidateForm(schema, data)) return

        createCoupon({
            name: data.name!,
            amount: data.amount!,
            expireDate: new Date(data.expireDate!),
        })
    }

    return (
        <Transition>
            <Helmet>
                <title>Create Coupon</title>
            </Helmet>
            <Card>
                <CardHeader className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl">
                    Create Coupon
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateCoupon}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <CustomInput
                                type="text"
                                label="Coupon Name"
                                id="name"
                                name="name"
                                placeholder="COUPON"
                                isRequired
                                value={data.name || ''}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                            <CustomInput
                                type="number"
                                label="Coupon Amount"
                                id="amount"
                                name="amount"
                                placeholder="50%"
                                isRequired
                                value={data.amount || ''}
                                onChange={(e) =>
                                    setData({ ...data, amount: Number(e.target.value) })
                                }
                            />
                            <Box className="flex w-full flex-col justify-between space-y-3">
                                <Label htmlFor="expireDate">
                                    Expire Date <RequiredStar />
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'justify-start text-left',
                                                !data.expireDate && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 size-4" />
                                            {data.expireDate ? (
                                                format(data.expireDate, 'dd-M-yyyy')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={data.expireDate}
                                            onSelect={(date) =>
                                                setData({ ...data, expireDate: date })
                                            }
                                            className="rounded-md border shadow"
                                            classNames={{
                                                day_today: 'border-2',
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Box>
                        </div>

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
