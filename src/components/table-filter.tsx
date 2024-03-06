import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { RefreshCcw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import ToolTip from './my/tooltip'
import { Button, buttonVariants } from './ui/button'
import { Input } from './ui/input'

export interface TableSearchProps {
    search: string | undefined
    onSearch: (value: string) => void
}
export const TableSearch = ({ search, onSearch }: TableSearchProps) => {
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        setInputValue(search ?? '')
    }, [search])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSearch(inputValue || '')
            }}
            className="flex w-full items-center gap-2 lg:w-[50%]"
        >
            <Input
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
                placeholder="Search..."
                value={inputValue}
                type="text"
            />
            <ToolTip content="Search">
                <Button variant="outline" type="submit">
                    <Search size={18} />
                </Button>
            </ToolTip>
        </form>
    )
}

export interface TableSortProps {
    sort: string | undefined
    setSort: (sort: string) => void
    sortItems: { value: string; label: string }[]
    className?: string
}
export const TableSort = ({ sort, setSort, sortItems, className }: TableSortProps) => {
    return (
        <Select onValueChange={(value) => setSort(value)} value={sort || ''}>
            <SelectTrigger className={cn('lg:w-[200px]', className)}>
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className={cn('lg:w-[200px]', className)}>
                {sortItems.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export interface TableCreateLinkButtonProps {
    link: string
}

export const TableCreateLinkButton = ({ link }: TableCreateLinkButtonProps) => {
    return (
        <ToolTip content="Add New">
            <Link to={link} className={cn(buttonVariants({ variant: 'outline' }), 'flex items-center gap-2')}>
                Create
                <IoAddCircleSharp size={20} className="text-primary" />
            </Link>
        </ToolTip>
    )
}

export interface TableRefreshDataProps {
    onRefresh: () => void
}
export const TableRefreshData = ({ onRefresh }: TableRefreshDataProps) => {
    return (
        <ToolTip content="Refresh">
            <Button size="icon" variant="outline" onClick={onRefresh}>
                <RefreshCcw className="text-primary" size={20} />
            </Button>
        </ToolTip>
    )
}
