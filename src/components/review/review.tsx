import { useUserContext } from '@/context/UserContextProvider'
import { useDeleteReview, useEditReview } from '@/hooks/use-reviews'
import { cn } from '@/lib/utils'
import { ReviewProps } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Edit2, Trash2 } from 'lucide-react'
import React, { Fragment } from 'react'
import { HiStar } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Alert from '../alert'
import Dialog from '../my/my-dialog'
import ToolTip from '../my/tooltip'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import Rating from './rating'

interface Props {
    review: ReviewProps
}
interface DataProps {
    comment: string
    rating: number
}

const Review: React.FC<Props> = ({ review }) => {
    const { token, currentUser } = useUserContext()
    const queryClient = useQueryClient()
    const { slug } = useParams()
    const { mutate: editReview, isPending } = useEditReview()
    const { mutate: deleteReview, isPending: deleteLoading } = useDeleteReview()
    const [data, setData] = React.useState<DataProps>({
        comment: review.comment,
        rating: review.rating,
    })
    const [hoveredValue, setHoveredValue] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)

    const formattedComment = review.comment.split('\n').map((line, index) => (
        <Fragment key={index}>
            {line}
            <br />
        </Fragment>
    ))

    return (
        <div className="w-full border square p-2 shadow">
            {/* user info */}
            <div className="flex justify-between items-start w-full flex-wrap">
                <div className="flex items-start gap-2">
                    <img
                        src={review.userId.image?.secure_url}
                        className="size-10 circle object-cover"
                        alt={review.userId.username}
                    />
                    <div>
                        <p className="font-semibold capitalize text-primary">
                            {review.userId.username}
                        </p>
                        <Rating value={review.rating} />
                    </div>
                </div>
                <p className="text-muted-foreground text-xs">
                    {format(new Date(review.createdAt), 'dd/M/yyyy')}
                </p>
            </div>

            {/* comment & options */}
            <div className="mt-2">
                <p className="text-sm text-foreground rounded-lg p-1 lg:px-2">{formattedComment}</p>
                <div
                    className={cn(
                        'flex justify-end gap-2',
                        (!token ||
                            (currentUser?._id !== review.userId._id &&
                                currentUser.role != 'Admin')) &&
                            'hidden'
                    )}
                >
                    {(token && currentUser?._id == review.userId._id) && (
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            trigger={
                                <div>
                                    <ToolTip content="Edit">
                                        <Edit2
                                            size={14}
                                            className="pointer text-muted-foreground hover:text-green-400"
                                        />
                                    </ToolTip>
                                </div>
                            }
                            header="Edit Review"
                        >
                            <div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                                        <HiStar
                                            key={value}
                                            size={20}
                                            className={cn(
                                                'cursor-pointer transition-colors',
                                                value <= (hoveredValue || data.rating)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-400'
                                            )}
                                            onMouseEnter={() => setHoveredValue(value)}
                                            onMouseLeave={() => setHoveredValue(0)}
                                            onClick={() => setData({ ...data, rating: value })}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-400 ml-1 block leading-tight">
                                        ({data.rating})
                                    </span>
                                </div>
                                <Textarea
                                    value={data.comment}
                                    onChange={(e) => setData({ ...data, comment: e.target.value })}
                                    className="w-full mt-3 h-28 resize-y"
                                    placeholder="Leave a comment"
                                />
                                <Button
                                    variant="default"
                                    className="w-full mt-3"
                                    onClick={() =>
                                        editReview(
                                            { infos: data, reviewId: review._id },
                                            {
                                                onSuccess() {
                                                    // close dialog
                                                    setIsOpen(false)
                                                    queryClient.invalidateQueries({
                                                        queryKey: ['reviews', review.productId._id],
                                                    })
                                                    queryClient.invalidateQueries({
                                                        queryKey: ['get-product', undefined, slug],
                                                    })
                                                },
                                            }
                                        )
                                    }
                                    disabled={isPending}
                                >
                                    {isPending ? <BeatLoader color="white" /> : 'Edit Review'}
                                </Button>
                            </div>
                        </Dialog>
                    )}

                    <Alert
                        onConfirm={() =>
                            deleteReview(
                                {
                                    reviewId: review._id,
                                },
                                {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({
                                            queryKey: ['reviews', review.productId._id],
                                        })
                                        queryClient.invalidateQueries({
                                            queryKey: ['reviews'],
                                        })
                                        queryClient.invalidateQueries({
                                            queryKey: ['get-product', undefined, slug],
                                        })
                                    },
                                }
                            )
                        }
                    >
                        <div>
                            <ToolTip content="Delete">
                                <div>
                                    {deleteLoading ? (
                                        <BeatLoader color="hsl(var(--primary))" size={7} />
                                    ) : (
                                        <Trash2
                                            size={14}
                                            className="pointer text-muted-foreground hover:text-destructive"
                                        />
                                    )}
                                </div>
                            </ToolTip>
                        </div>
                    </Alert>
                </div>
            </div>
        </div>
    )
}

export default Review
