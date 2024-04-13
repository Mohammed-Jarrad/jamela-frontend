import {
    DialogContent,
    Dialog as DialogPrimitive,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog'

type Props = {
    trigger?: React.ReactNode
    header?: React.ReactNode | string
    description?: React.ReactNode | string
} & React.ComponentProps<typeof DialogPrimitive>

const Dialog: React.FC<Props> = ({ children, trigger, header, description, ...props }) => {
    return (
        <DialogPrimitive {...props}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent>
                {header && (
                    <DialogHeader>
                        <DialogTitle>{header}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                )}
                {children}
            </DialogContent>
        </DialogPrimitive>
    )
}

export default Dialog
