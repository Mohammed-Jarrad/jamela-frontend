import { useGetCategory } from '@/hooks/use-categories'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import SubcategoriesSlider from './subcategories-slider'

const Category = () => {
    const { slug } = useParams()

    const { data, isLoading, error } = useGetCategory({
        slug,
        select: 'name,slug',
        populate: true,
        subselect: 'name,image,slug',
    })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)

    if (isLoading) {
        return (
            <div>
                <BeatLoader color="hsl(var(--primary))" className="my-5 text-center" />
            </div>
        )
    }
    if (!data)
        return <div className="text-center text-xl text-muted-foreground my-6">No data found</div>
    return (
        <Transition className="container my-8">
            <Helmet>
                <title>{data?.category.name}</title>
            </Helmet>

            {/* Category Name */}
            <h1 className="custom-gradient text-center">{data?.category.name}</h1>

            <SubcategoriesSlider subcategories={data.category.subcategories!} />
        </Transition>
    )
}

export default Category
