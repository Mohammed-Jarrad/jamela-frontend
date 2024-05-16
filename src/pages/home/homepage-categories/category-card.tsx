import ToolTip from '@/components/my/tooltip'
import { CategoryProps } from '@/types'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    category: CategoryProps
    index: number
}

const CategoryCard: React.FC<Props> = ({ category, index }) => {
    return (
        <Link to={`/category/${category.slug}`} className="relative w-full group">
            <div className="aspect-w-2 aspect-h-3 border shadow overflow-hidden transition-all rounded-lg">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    src={category.image?.secure_url}
                    alt={category.name}
                    loading="lazy"
                    className="object-cover"
                />
            </div>
            <div className='inset-0 absolute bg-black bg-opacity-20 backdrop-blur-[2px] group-hover:opacity-100 opacity-0 transition-all'>
                <ToolTip content={category.name}>
                    <h4
                        style={{
                            textShadow: '1px 1px 3px rgba(0, 0, 0)',
                        }}
                        className="group-hover:-translate-y-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 w-[180px] text-center truncate capitalize text-white transition-all hover:underline max-md:text-sm"
                    >
                        {category.name}
                    </h4>
                </ToolTip>
            </div>
        </Link>
    )
}

export default CategoryCard
