import { cn } from '@/lib/utils'
import { ComponentProps, useEffect, useState } from 'react'

type Props = ComponentProps<'input'> & { markClassName?: string }
const Checkbox: React.FC<Props> = ({ markClassName, checked, onChange, className, ...props }) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        } else {
            setIsChecked(e.target.checked)
        }
    }
    useEffect(() => {
        setIsChecked(checked as boolean)
    }, [checked])

    return (
        <label className={`relative cursor-pointer`}>
            <input
                type="checkbox"
                className={cn('peer hidden', className)}
                checked={checked}
                onChange={handleCheckboxChange}
                {...props}
            />
            <div
                className={cn(
                    `flex h-[1.3em] w-[1.3em] items-center justify-center overflow-hidden rounded-sm border bg-accent p-[2px] 
                    transition-all duration-200`,
                    isChecked && 'rounded-full bg-primary',
                    markClassName
                )}
            >
                <svg
                    className={cn(
                        `scale-[2] opacity-0 transition-all duration-200 ease-in`,
                        isChecked && 'scale-100 opacity-100'
                    )}
                    viewBox="0 0 24 24"
                    id="check"
                    data-name="Line Color"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polyline
                        id="primary"
                        points="5 12 10 17 19 8"
                        className="fill-none stroke-white stroke-[3px]"
                        style={{
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                        }}
                    ></polyline>
                </svg>
            </div>
        </label>
    )
}

export default Checkbox
