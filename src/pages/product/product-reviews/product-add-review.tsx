import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAddReview } from '@/hooks/use-reviews'
import { cn } from '@/lib/utils'
import { yupValidateForm } from '@/lib/yup-validate-form'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { HiStar } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'

interface Props {
    productId: string
}
interface dataProps {
    rating: number
    comment?: string
}

const ProductAddReview: React.FC<Props> = ({ productId }) => {
    const queryClient = useQueryClient()
    const { slug } = useParams()
    const [data, setData] = useState<dataProps>({
        rating: 0,
        comment: '',
    })
    const { mutate: add, isPending } = useAddReview()

    function handleChangeData(value: string | number, name: keyof dataProps) {
        setData((pre) => ({ ...pre, [name]: value }))
    }

    function handleAddReview() {
        const schema = Yup.object().shape({
            rating: Yup.number().required('Rating is required').min(1).max(5),
            comment: Yup.string().required('Comment is required'),
        })
        const validateData = yupValidateForm<dataProps>(schema, data)
        if (!validateData) return
        add(
            {
                productId,
                ...data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
                    queryClient.invalidateQueries({ queryKey: ['get-product', undefined, slug] })
                    setData({
                        rating: 0,
                        comment: '',
                    })
                },
            }
        )
    }

    const [hoveredValue, setHoveredValue] = useState(0)

    return (
        <Card className="w-full lg:w-[350px] ">
            <CardHeader>
                <CardTitle className="text-base">Add Review</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                            <ToolTip content={value} key={value}>
                                <div>
                                    <HiStar
                                        size={20}
                                        className={cn(
                                            'cursor-pointer transition-colors',
                                            value <= (hoveredValue || data.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-400'
                                        )}
                                        onMouseEnter={() => setHoveredValue(value)}
                                        onMouseLeave={() => setHoveredValue(0)}
                                        onClick={() => handleChangeData(value, 'rating')}
                                    />
                                </div>
                            </ToolTip>
                        ))}
                    </div>
                    <Textarea
                        value={data.comment}
                        onChange={(e) => handleChangeData(e.target.value, 'comment')}
                        className="w-full mt-3 h-28 resize-y"
                        placeholder="Leave a comment"
                    />
                    <Button
                        variant="default"
                        className="w-full mt-3"
                        onClick={handleAddReview}
                        disabled={isPending}
                    >
                        {isPending ? <BeatLoader color="white" size={10} /> : 'Add Review'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductAddReview
