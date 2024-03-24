import { toast } from 'sonner'
import * as Yup from 'yup'

export function yupValidateForm<T>(yupSchema: Yup.ObjectSchema<Yup.AnyObject>, values: T) {
    try {
        yupSchema.validateSync(values, {
            abortEarly: false,
        })
        return true
    } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach((err) => {
                toast.error(err.message, { position: 'bottom-left' })
            })
        } else {
            toast.error('message' in error ? error.message : 'An error occurred')
        }
        return false
    }
}
