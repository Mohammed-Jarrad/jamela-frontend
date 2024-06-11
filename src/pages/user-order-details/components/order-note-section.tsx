import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUserContext } from "@/context/UserContextProvider"
import { useEditOrderNote } from '@/hooks/use-orders'
import { OrderProps } from '@/types'
import { Edit2, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    order: OrderProps
}

const OrderNoteSection: React.FC<Props> = ({ order }) => {
    const [note, setNote] = useState<string>(order.note as string)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const { mutate: editOrderNote, isPending } = useEditOrderNote()
    const {currentUser: {role}} = useUserContext()

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <b className="text-muted-foreground flex items-center gap-1">
                    <MessageCircle size={18} color="hsl(var(--primary))" /> Note
                </b>

                {order.status == 'pending' && role == 'User' && (
                    <ToolTip content="Edit">
                        <Edit2
                            size={16}
                            className="pointer text-green-500 hover:text-green-600"
                            onClick={() => {
                                setShowEdit(!showEdit)
                                setNote(order.note as string)
                            }}
                        />
                    </ToolTip>
                )}
            </div>

            {showEdit && role == 'User' ? (
                <>
                    <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full resize-none h-24"
                        placeholder="Add a note to your order"
                    />
                    <div className="flex justify-end items-center gap-2">
                        <Button
                            variant={'ghost'}
                            onClick={() => {
                                setNote(order.note || '')
                                setShowEdit(false)
                            }}
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                editOrderNote(
                                    { note, orderId: order._id },
                                    {
                                        onSuccess: () => {
                                            setShowEdit(false)
                                        },
                                    }
                                )
                            }
                            className="border"
                            size="sm"
                            disabled={isPending}
                        >
                            {isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </>
            ) : (
                <p className="text-sm text-muted-foreground border border-dashed border-muted-foreground px-2 py-1 bg-muted rounded">
                    {order.note ? (
                        order.note.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))
                    ) : (
                        <span className="italic text-muted-foreground">No note</span>
                    )}
                </p>
            )}
        </div>
    )
}

export default OrderNoteSection
