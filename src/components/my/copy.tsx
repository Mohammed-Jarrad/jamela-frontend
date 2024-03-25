import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCheck, Copy as CopyIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import ToolTip from './tooltip'

type Props = {
    text: string
    className?: string
}

const Copy: React.FC<Props> = ({ text, className }) => {
    const [isCopied, setIsCopied] = useState(false)

    function copy(text: string) {
        navigator.clipboard.writeText(text)
        toast.success(
            <>
                Copied! <b>{text}</b>
            </>
        )
        // set isCopied to true
        setIsCopied(true)
        // set isCopied to false after 3 seconds
        setTimeout(() => {
            setIsCopied(false)
        }, 3000)
    }

    return (
        <ToolTip content={<span className="text-[10px] font-poppins">Copy</span>}>
            <Button
                size={'icon'}
                variant={'outline'}
                className={cn('hover:ring-[0.5px] ring-primary', className)}
                onClick={() => copy(text)}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isCopied ? (
                            <motion.div
                                layout
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <CheckCheck className="text-emerald-400" size={16} />
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <CopyIcon className="text-muted-foreground" size={14} />
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </Button>
        </ToolTip>
    )
}

export default Copy
