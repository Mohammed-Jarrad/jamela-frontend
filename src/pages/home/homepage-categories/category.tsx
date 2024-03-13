import { CategoryProps } from '@/types'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    category: CategoryProps
    index: number
}

const Category: React.FC<Props> = ({ category, index }) => {
    return (
        <Link
            to={`/category/${category.slug}`}
            className="relative w-full space-y-3 overflow-hidden border shadow"
        >
            <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                src={category.image?.secure_url}
                alt={category.name}
                loading="lazy"
                className="aspect-[2/3] h-full w-full object-cover object-center"
            />
            <h4
                style={{
                    textShadow: '0 0 10px rgba(0, 0, 0)', // i need a big shadow
                }}
                className="-translate-y-1/2text-accent absolute left-1/2 top-1/2 -translate-x-1/2 truncate capitalize text-white transition-all hover:underline"
            >
                {category.name}
            </h4>
        </Link>
    )
}

export default Category
