import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
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
import { Delete, Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { MdRestore } from 'react-icons/md'
import { Link } from 'react-router-dom'

type CustomProps = {
    editPageLink: string
    dialogTitle?: string
    dialogDescription?: string
    onHardDelete: () => void
    onSoftDelete: () => void
    onRestore: () => void
}

const CouponsDropDownWithAlertDialog = ({
    editPageLink,
    dialogTitle = 'Are you absolutely sure?',
    dialogDescription = 'This action cannot be undone.',
    onHardDelete,
    onSoftDelete,
    onRestore,
}: CustomProps) => {
    const [showHardDelete, setShowHardDelete] = useState<boolean>(false)
    const [showSoftDelete, setShowSoftDelete] = useState<boolean>(false)
    const [showRestore, setShowRestore] = useState<boolean>(false)

    const handleRestore = () => {
        onRestore()
        setShowRestore(false)
    }
    const handleHardDelete = () => {
        onHardDelete()
        setShowHardDelete(false)
    }
    const handleSoftDelete = () => {
        onSoftDelete()
        setShowSoftDelete(false)
    }

    return (
        <AlertDialog open={showHardDelete || showSoftDelete || showRestore}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className={cn(buttonVariants({ variant: 'ghost' }))}>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link to={editPageLink} className="flex items-center">
                            <Edit className="mr-2 w-4" /> Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="w-full" onClick={() => setShowHardDelete(true)}>
                        <div className="flex w-full items-center">
                            <Trash className="mr-2 w-4" />
                            Delete
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setShowSoftDelete(true)}>
                        {/* Here i need when click to open another alert dialog for soft Delete */}
                        <div className="flex w-full items-center">
                            <Delete className="mr-2 w-4" />
                            Soft Delete
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setShowRestore(true)}>
                        {/* Here i need when click to open another alert dialog for restore */}
                        <div className="flex w-full items-center">
                            <MdRestore className="mr-2 w-4" />
                            Restore
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader className="items-center">
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            if (showHardDelete) setShowHardDelete(false)
                            if (showSoftDelete) setShowSoftDelete(false)
                            if (showRestore) setShowRestore(false)
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            if (showHardDelete) handleHardDelete()
                            if (showSoftDelete) handleSoftDelete()
                            if (showRestore) handleRestore()
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CouponsDropDownWithAlertDialog
