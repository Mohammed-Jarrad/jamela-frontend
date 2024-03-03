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
import { buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Edit, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CustomProps {
    editPageLink: string
    dialogTitle?: string
    dialogDescription?: string
    onDelete: () => void
}

const CustomDropDownWithAlertDialog = ({
    editPageLink,
    dialogTitle = 'Are you absolutely sure?',
    dialogDescription = 'This action cannot be undone.',
    onDelete,
}: CustomProps) => {
    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className={cn(buttonVariants({ variant: 'ghost' }))}>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link to={editPageLink} className="flex h-full">
                            <Edit className="mr-2 w-4" /> Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="w-full">
                        <AlertDialogTrigger className="flex w-full">
                            <Trash className="mr-2 w-4" />
                            Delete
                        </AlertDialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent itemID="delete">
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomDropDownWithAlertDialog
