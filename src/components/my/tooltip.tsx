import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props extends React.ComponentPropsWithoutRef<typeof Tooltip> {
    content?: React.ReactNode | null
    side?: 'left' | 'right' | 'top' | 'bottom'
}

const ToolTip: React.FC<Props> = ({ children, content, side, ...props }) => {
    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            {content && (
                <div>
                    <TooltipContent
                        className="bg-neutral-600 text-white dark:bg-white/70 dark:text-black border-none"
                        sideOffset={5}
                        side={side || 'top'}
                    >
                        {content}
                    </TooltipContent>
                </div>
            )}
        </Tooltip>
    )
}

export default ToolTip
