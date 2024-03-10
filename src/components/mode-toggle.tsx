import { useTheme } from '@/context/ThemeContextProvider'
import styled from 'styled-components'
import ToolTip from './my/tooltip'

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTheme(e.target.checked ? 'dark' : 'light')
    }
    return (
        <ToolTip content={theme}>
            <Label>
                <input type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
                <span />
            </Label>
        </ToolTip>
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
