import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props extends React.ComponentPropsWithoutRef<typeof Tooltip> {
    content?: React.ReactNode | null
}

const ToolTip: React.FC<Props> = ({ children, content, ...props }) => {
    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            {content && (
                <div>
                    <TooltipContent className="text-[13px] bg-black/70 text-white dark:bg-white/70 dark:text-black" sideOffset={5}>
                        {content}
                    </TooltipContent>
                </div>
            )}
        </Tooltip>
    )
}

export default ToolTip
