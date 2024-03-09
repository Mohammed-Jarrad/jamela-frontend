import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { ConstantImages } from '@/types'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { TbEdit } from 'react-icons/tb'
import EditImageDialog from './edit-image-dialog'

interface Props {
    image: ConstantImages
    index: number
    deleteMutation: UseMutationResult<
        {
            message: string
            imageId: string
        },
        Error | AxiosError<unknown, any>,
        string,
        unknown
    >
}

const ImageCard: FC<Props> = ({ image, index, deleteMutation }) => {
    const { mutate: deleteImage } = deleteMutation

    const [openEdit, setOpenEdit] = useState<boolean>(false)

    function handleDelete() {
        deleteImage(image._id)
    }

    return (
        <Flex
            as={motion.div}
            $direction="column"
            key={image._id}
            className="group relative rounded-xl p-3 ring ring-border transition-all hover:ring-primary"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <div className="relative overflow-hidden rounded-lg">
                <motion.img src={image.secure_url} alt={image.public_id} className="aspect-[16/9] rounded-xl object-cover" />
                <Flex
                    $center={true}
                    className="pointer-events-none absolute inset-0 bg-black/40  opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100"
                >
                    <AlertDialog>
                        <AlertDialogTrigger className={cn(buttonVariants({ variant: 'destructive' }), 'flex gap-1')}>
                            <FaTrash />
                            Delete
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this image.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="flex gap-1" onClick={handleDelete}>
                                    <FaTrash />
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant={'secondary'} className="flex gap-1 border" onClick={() => setOpenEdit(true)}>
                        <TbEdit />
                        Edit
                    </Button>
                </Flex>
            </div>
            <EditImageDialog open={openEdit} setOpen={setOpenEdit} image={image} />
        </Flex>
    )
}

export default ImageCard
