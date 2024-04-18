import Alert from '@/components/alert'
import Dialog from '@/components/my/my-dialog'
import ToolTip from '@/components/my/tooltip'
import Review from "@/components/review/review"
import { TableCell, TableRow } from '@/components/ui/table'
import { useDeleteReview } from '@/hooks/use-reviews'
import { Flex } from '@/styles/styles'
import { ReviewProps } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Eye, Trash2 } from 'lucide-react'
import React, { Fragment } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { BeatLoader } from 'react-spinners'

interface Props {
    review: ReviewProps
    index: number
}

const AdminReviewRow: React.FC<Props> = ({ review, index }) => {
    const { mutate: deleteReview, isPending } = useDeleteReview()
    const queryClient = useQueryClient()

    const formattedComment = review.comment.split('\n').map((line, index) => (
        <Fragment key={index}>
            {line}
            <br />
        </Fragment>
    ))

    return (
        <TableRow>
            {/* Number */}
            <TableCell className="font-bold">{index + 1}</TableCell>
            {/* User */}
            <TableCell>
                <Flex $items="center">
                    <img
                        className="size-10 circle object-cover"
                        src={review.userId.image?.secure_url}
                        alt={review.userId.username}
                    />
                    <ToolTip content={review.userId.username} disableHoverableContent={false}>
                        <p className="font-medium capitalize truncate">{review.userId.username}</p>
                    </ToolTip>
                </Flex>
            </TableCell>
            {/* Product */}
            <TableCell>
                <Flex $items="center">
                    <img
                        className="size-10 circle object-cover"
                        src={review.productId.mainImage?.secure_url}
                        alt={review.productId.name}
                    />
                    <ToolTip content={review.productId.name} disableHoverableContent={false}>
                        <p className="font-medium capitalize truncate">{review.productId.name}</p>
                    </ToolTip>
                </Flex>
            </TableCell>
            {/* Date */}
            <TableCell>{format(new Date(review.createdAt), 'dd/M/yyyy')}</TableCell>
            {/* Comment */}
            <TableCell>
                <div className="max-w-xs truncate">{formattedComment}</div>
            </TableCell>
            {/* Rating */}
            <TableCell>
                <Flex $center={true}>
                    <BsStarFill color="#f59e0b" />
                    <span className="font-bold">{review.rating}</span>
                </Flex>
            </TableCell>
            {/* Actions */}
            <TableCell>
                <div className="centered gap-2">
                    <Alert
                        onConfirm={() => {
                            deleteReview(
                                { reviewId: review._id },
                                {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({
                                            queryKey: ['reviews'],
                                        })
                                    },
                                }
                            )
                        }}
                    >
                        <div>
                            {isPending ? (
                                <BeatLoader color="hsl(var(--primary))" size={8} />
                            ) : (
                                <ToolTip content="Delete">
                                    <Trash2
                                        size={16}
                                        className="text-red-500 cursor-pointer hover:text-red-600"
                                    />
                                </ToolTip>
                            )}
                        </div>
                    </Alert>

                    <Dialog
                        trigger={
                            <div>
                                <ToolTip content="Show">
                                    <Eye
                                        size={16}
                                        className="text-green-500 cursor-pointer hover:text-green-600"
                                    />
                                </ToolTip>
                            </div>
                        }
                        header="Review"
                        description={"review details"}
                    >
                        <Review review={review}/>
                    </Dialog>
                </div>
            </TableCell>
        </TableRow>
    )
}
export default AdminReviewRow
