import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import Flex from './my/flex'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface LimitControllerProps {
    limit: number
    totalResultsCounts: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
}
const LimitController = ({ limit, totalResultsCounts, setLimit }: LimitControllerProps) => {
    function handleMinusLimit() {
        limit !== 1 && setLimit((old) => old - 1)
    }
    function handlePlusLimit() {
        limit !== totalResultsCounts && setLimit((old) => old + 1)
    }

    return (
        <Flex align={'center'} justify="end">
            <Button
                variant="ghost"
                size="sm"
                className="disabled:cursor-not-allowed disabled:text-gray-400"
                disabled={limit == 1}
                onClick={handleMinusLimit}
            >
                <Minus size={16} />
            </Button>
            <Input
                value={limit}
                onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value >= 1 && value <= totalResultsCounts) setLimit(value)
                    else toast.warning('Please enter a number between 1 and ' + totalResultsCounts)
                }}
                max={totalResultsCounts}
                min={1}
                type="number"
                className="min-w-16 max-w-32 text-center"
            />
            <Button
                variant="ghost"
                size="sm"
                className="disabled:cursor-not-allowed disabled:text-gray-400"
                disabled={limit >= totalResultsCounts}
                onClick={handlePlusLimit}
            >
                <Plus size={16} />
            </Button>
        </Flex>
    )
}

export default LimitController
