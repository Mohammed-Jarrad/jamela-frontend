import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props extends React.ComponentPropsWithoutRef<typeof Tooltip> {
    content?: React.ReactNode | null
}

const ToolTip: React.FC<Props> = ({ children, content, ...props }) => {
    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            {content && <TooltipContent className="text-[13px]">{content}</TooltipContent>}
        </Tooltip>
    )
}

export default ToolTip
