import { Skeleton } from '@/components/ui/skeleton'

const NewArrivalsLoading = () => {
    return (
        <div className="xs:grid-cols-2 mt-8 grid grid-cols-1 gap-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    )
}

export default NewArrivalsLoading
