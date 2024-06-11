import ToolTip from '@/components/my/tooltip'
import { CategoryProps } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    category: CategoryProps
    index: number
}

const CategoryCard: React.FC<Props> = ({ category }) => {
    return (
        <Link to={`/category/${category.slug}`} className="relative w-full group rounded-lg">
            <div className="border shadow overflow-hidden transition-all rounded-lg">
                <img
                    src={category.image?.secure_url}
                    alt={category.name}
                    loading="lazy"
                    className="object-cover w-full aspect-[7/10] group-hover:scale-110 transition-all duration-300"
                />
            </div>
            <div className="inset-1 absolute bg-black/20 translate-y-0 rounded-[inherit] group-hover:translate-y-0 group-hover:opacity-100 group-hover:inset-0 opacity-0 transition-all duration-500">
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
