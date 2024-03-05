import { ToolTip } from '@/styles/styles'
import styled from 'styled-components'

const Container = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
`

const Test = () => {
    return (
        <Container>
            <div>
                <ToolTip>Hellllllll</ToolTip>
                <ToolTip as="p" $tooltip={'Hello tooltip'}>
                    Hello
                </ToolTip>
            </div>
        </Container>
    )
}

export default Test
