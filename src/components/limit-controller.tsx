import { Minus, Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import Flex from './my/flex'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface LimitControllerProps {
    limit: number
    totalResultsCounts: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
}
const LimitController = ({ limit, totalResultsCounts, setLimit }: LimitControllerProps) => {
    const [inputValue, setInputValue] = React.useState<number>(limit || 1)
    useEffect(() => {
        setInputValue(limit)
    }, [limit])
    function handleMinusLimit() {
        limit !== 1 && setLimit((old) => old - 1)
    }
    function handlePlusLimit() {
        limit !== totalResultsCounts && setLimit((old) => old + 1)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (inputValue >= 1 && inputValue <= totalResultsCounts) {
            setLimit(inputValue)
        } else {
            setLimit((prev) => Math.min(prev, totalResultsCounts))
            setInputValue((prev) => Math.min(prev, totalResultsCounts))
        }
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
            <form onSubmit={handleSubmit} className="w-auto">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    max={totalResultsCounts}
                    min={1}
                    type="number"
                    className="min-w-16 text-center"
                />
            </form>
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
