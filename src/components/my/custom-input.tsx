import { Box } from '@radix-ui/themes'
import React from 'react'
import RequiredStar, { OptionalSpan } from '../required-star'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    required?: boolean
    parentClassName?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, name, required = false, parentClassName, ...props }, ref) => {
        return (
            <Box className={cn("flex flex-col space-y-3", parentClassName)}>
                <Label htmlFor={name} className="w-fit text-xs text-muted-foreground md:text-sm">
                    {label} {required ? <RequiredStar /> : <OptionalSpan />}
                </Label>
                <Input ref={ref} name={name} id={name} required={required} {...props} />
            </Box>
        )
    }
)

export default CustomInput
