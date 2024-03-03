import { HTMLMotionProps, motion } from 'framer-motion'
import { forwardRef } from 'react'

type TransitionProps = HTMLMotionProps<'div'>

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
    (
        {
            children,
            initial = { opacity: 0, x: -70 },
            animate = { opacity: 1, x: 0 },
            exit = { opacity: 0, x: 70 },
            transition = { duration: 0.5 },
            ...props
        },
        ref
    ) => {
        return (
            <motion.div initial={initial} animate={animate} exit={exit} transition={transition} ref={ref} {...props}>
                {children}
            </motion.div>
        )
    }
)

export default Transition
