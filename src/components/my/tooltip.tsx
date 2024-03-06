import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props {
    children: React.ReactNode
    content: React.ReactNode | string
}

const ToolTip: React.FC<Props> = ({ children, content }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
        </Tooltip>
    )
}

export default ToolTip
