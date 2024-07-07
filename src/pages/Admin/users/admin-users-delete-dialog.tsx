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
import Tooltip from '@/components/my/tooltip'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
    onDelete: () => void
}

const AdminUsersDeleteDialog: React.FC<Props> = ({ onDelete }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Tooltip content="Delete User">
                    <Trash
                        size={18}
                        className="cursor-pointer text-red-500 transition-all hover:scale-110 hover:fill-red-500"
                    />
                </Tooltip>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        It will delete all this user associated data from the app. <br />
                        This action cannot be undone. <br />
                        This will permanently delete this user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AdminUsersDeleteDialog
