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
            <MySwitch />
        </Container>
    )
}

export default Test

const MySwitch = () => {
    const { theme, setTheme } = useTheme()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTheme(e.target.checked ? 'dark' : 'light')
    }

    return (
        <>
            <Label>
                <input type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
                <span />
            </Label>
        </>
    )
}

const Label = styled.label`
    --unit-width: 1.3rem;
    --times: 2.5;
    --border-w: 1px;
    --padding-w: 3px;
    border: var(--border-w) solid hsl(var(--border));
    border-radius: 100px;
    width: calc(var(--times) * var(--unit-width));
    display: flex;
    padding: var(--padding-w);
    transition: border-color 0.3s;
    cursor: pointer;

    &:has(> input:checked) {
        border-color: hsl(var(--primary));
        /* justify-content: flex-start; */
        > span {
            transform: translateX(0%);
            box-shadow: inset 5px -3px 0px 1px #90861f;
        }
    }

    & > input {
        display: none;
    }

    & > span {
        display: block;
        width: var(--unit-width);
        height: var(--unit-width);
        border-radius: 50%;
        transform: translateX(
            calc(((var(--times) - 1) * 100%) - ((var(--border-w) + var(--padding-w)) * 2))
        );
        box-shadow: inset 20px 3px 0px 1px #e3d102;
        transition:
            all 0.5s,
            box-shadow 600ms;
    }
`
