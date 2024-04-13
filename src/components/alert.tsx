import React from 'react'
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
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    cancelText?: string
    confirmText?: string
    onConfirm?: () => void
    onCancel?: () => void
    className?: string
}

const Alert: React.FC<Props> = ({
    children,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    cancelText = 'Cancel',
    confirmText = 'Continue',
    onConfirm,
    onCancel,
    className,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className={cn('', className)}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Alert
