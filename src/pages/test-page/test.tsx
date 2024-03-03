import { Button as BTN } from '@/components/ui/button'
import { Flex } from '@/styles/styles'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
`
const Button = styled(BTN).attrs({ variant: 'ghost', size: 'lg' })`
    border: 1px solid hsl(var(--border));
`

const Test = () => {
    const [value, setValue] = useState(true)

    return (
        <Container>
            <Flex $direction="column">
                <h1
                    data-value={value}
                    className="group rounded-2xl border border-muted-foreground/70 p-4 px-6 text-yellow-400 transition-colors data-[value=true]:border-red-400 data-[value=true]:text-red-400"
                >
                    Test Page <span className="underline group-data-[value=true]:line-through">{value.toString()}</span>
                </h1>

                <Button onClick={() => setValue((p) => !p)}>Click</Button>
            </Flex>
        </Container>
    )
}

export default Test
