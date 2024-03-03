import { Box } from '@radix-ui/themes'
import React from 'react'
import RequiredStar, { OptionalSpan } from '../required-star'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    required?: boolean
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, name, required = false, ...props }, ref) => {
        return (
            <Box className="flex flex-col space-y-3">
                <Label htmlFor={name} className="w-fit text-xs text-muted-foreground md:text-sm">
                    {label} {required ? <RequiredStar /> : <OptionalSpan />}
                </Label>
                <Input ref={ref} name={name} id={name} required={required} {...props} />
            </Box>
        )
    }
)

export default CustomInput
