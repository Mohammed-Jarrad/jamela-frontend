import { Skeleton } from '@/components/ui/skeleton'

const CategoriesLoading = () => {
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[500px] w-full" />
        </div>
    )
}

export default CategoriesLoading
