import Flex from '@/components/my/flex'
import { OptionalSpan } from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Transition from '@/components/transition'
import useClickOutside from '@/hooks/use-click-outside'
import { Box } from '@radix-ui/themes'
import { AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { toast } from 'sonner'

type ProductColorsProps = {
    colors: string[]
    setColors: React.Dispatch<React.SetStateAction<string[]>>
}

const ProductColors = ({ colors, setColors }: ProductColorsProps) => {
    const [selectedColor, setSelectedColor] = useState<string>('#fff')
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
    const colorPickerRef = useClickOutside(() => setShowColorPicker(false))
    function addColor(color: string) {
        if (colors.includes(color)) return toast.error('Color already exists')
        setColors((prev) => [...prev, color])
    }
    function removeColor(color: string) {
        setColors((prev) => prev.filter((c) => c !== color))
    }
    function isLightColor(color: string) {
        const c = color.substring(1) // strip #
        const rgb = parseInt(c, 16) // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff // extract red
        const g = (rgb >> 8) & 0xff // extract green
        const b = (rgb >> 0) & 0xff // extract blue

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

        return luma > 128
    }
    return (
        <Box className="flex flex-col space-y-3">
            <Label htmlFor="colors" className="text-xs text-muted-foreground md:text-sm">
                Colors <OptionalSpan />
            </Label>
            <Flex gap={'lg'} className="max-sm:flex-col">
                <Box className="relative" ref={colorPickerRef}>
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-40 border"
                        onClick={() => setShowColorPicker((p) => !p)}
                    >
                        Select Colors
                    </Button>
                    <AnimatePresence>
                        {showColorPicker && (
                            <Transition
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-full left-0 z-50 mb-2 min-w-full rounded border bg-card p-2 shadow"
                            >
                                <ChromePicker
                                    color={selectedColor}
                                    onChange={(color) => setSelectedColor(color.hex)}
                                />
                                <Button
                                    type="button"
                                    className="mt-3"
                                    onClick={() => addColor(selectedColor)}
                                >
                                    Add
                                </Button>
                            </Transition>
                        )}
                    </AnimatePresence>
                </Box>
                <Box className="flex flex-wrap items-center gap-2 text-sm">
                    <AnimatePresence mode="popLayout">
                        {colors.map((color) => (
                            <Transition
                                key={color}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 2 }}
                            >
                                <Box
                                    className={`group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
                                        isLightColor(color) && 'border'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => removeColor(color)}
                                >
                                    <X
                                        className={`h-4 w-4 transition-all group-hover:scale-[1.1] ${
                                            isLightColor(color) ? 'text-black' : 'text-white'
                                        }`}
                                    />
                                </Box>
                            </Transition>
                        ))}
                        {colors.length === 0 && (
                            <span className="text-muted-foreground">No colors selected</span>
                        )}
                    </AnimatePresence>
                </Box>
            </Flex>
        </Box>
    )
}

export default ProductColors
