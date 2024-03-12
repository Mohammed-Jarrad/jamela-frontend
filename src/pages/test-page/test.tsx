import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from '@/context/ThemeContextProvider'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
`

const Test = () => {
    return (
        <Container>
           <ModeToggle />
        </Container>
    )
}

export default Test
 