import { Badge } from '@radix-ui/themes'

const RequiredStar = () => {
    return (
        <Badge className="text-red-500" title="Required">
            *
        </Badge>
    )
}

export const OptionalSpan = () => {
    return (
        <span className="text-xs text-gray-400" title="This field is optional">
            (Optional)
        </span>
    )
}

export default RequiredStar
