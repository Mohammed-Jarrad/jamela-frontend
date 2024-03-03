import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    imageUrl: string
}

const ImageMagnifier: React.FC<Props> = ({ imageUrl }) => {
    const [show, setShow] = React.useState(false)
    const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
    function handleMouseMove(e: React.MouseEvent<HTMLImageElement>) {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setPosition({ x, y })
        setMousePosition({ x: e.clientX - left, y: e.clientY - top })
    }
    return (
        <div
            className="relative w-full cursor-zoom-in"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Main image */}
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={imageUrl}
                alt={"image magnifier"}
                loading="lazy"
                className="h-full max-h-full-screen-header w-full rounded-3xl object-cover shadow"
            />
            {/* Magnifier */}
            <div
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: `${mousePosition.y - 100}px`,
                    left: `${mousePosition.x - 100}px`,
                    display: show ? 'block' : 'none',
                    pointerEvents: 'none',
                }}
            >
                <div
                    className="h-[200px] w-[200px] rounded-lg border-2 border-white bg-white"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>
            </div>
        </div>
    )
}

export default ImageMagnifier
