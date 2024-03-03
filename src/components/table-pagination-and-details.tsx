import { cn } from '@/lib/utils'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react'
import Pagination from 'react-js-pagination'
import { buttonVariants } from './ui/button'

interface TablePaginationAndDetailsProps {
    currentPage: number
    itemsPerPage: number
    totalCount: number
    resultCount: number
    pagesCount: number
    onChange: (pageNumber: number) => void
    pageRange?: number
    totalResultsCounts: number
}

const TablePaginationAndDetails = ({
    currentPage,
    itemsPerPage,
    totalCount,
    onChange,
    pageRange = 3,
    resultCount,
    pagesCount,
    totalResultsCounts,
}: TablePaginationAndDetailsProps) => {
    return (
        <div className="my-5">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalResultsCounts}
                onChange={onChange}
                pageRangeDisplayed={pageRange}
                linkClass={cn(buttonVariants({ variant: 'ghost' }), 'w-8 h-8 text-lg border')}
                activeLinkClass={cn(buttonVariants(), 'w-8 h-8 text-lg border hover:text-white')}
                innerClass="flex justify-center gap-3 items-center"
                disabledClass="cursor-not-allowed"
                nextPageText={IconComp(ChevronRight)}
                prevPageText={IconComp(ChevronLeft)}
                firstPageText={IconComp(ChevronFirst)}
                lastPageText={IconComp(ChevronLast)}
            />
            <div className="my-2 flex flex-col items-center text-sm text-muted-foreground">
                <p>
                    got <strong>{totalResultsCounts}</strong> of <strong>{totalCount}</strong>
                </p>
                <p>
                    showing <strong>{resultCount}</strong> of <strong>{totalResultsCounts}</strong>
                </p>
                <p>
                    Page <strong>{currentPage}</strong>/{pagesCount}
                </p>
            </div>
        </div>
    )
}

const IconComp = (Icon: LucideIcon) => {
    return (
        <span>
            <Icon size="15" className="text-muted-foreground" />
        </span>
    )
}

export default TablePaginationAndDetails
