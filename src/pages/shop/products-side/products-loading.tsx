import { Skeleton } from '@/components/ui/skeleton'
import styled from 'styled-components'

const StyledSkeleton = styled(Skeleton)`
    min-width: 150px;
    height: 350px;
    border-radius: var(--radius);
    @media (min-width: 480px) {
        min-width: 240px;
    }
`
const ProductsLoading = () => {
    return (
        <div className="grid grid-cols-2 place-items-center gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
            <StyledSkeleton />
        </div>
    )
}

export default ProductsLoading
