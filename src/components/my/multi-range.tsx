import Slider from 'react-slider'
import styled from 'styled-components'

// StyledSlider component
export const MultiRange = styled(Slider)`
    --thumb-basis: 15px;
    width: 200px;
    max-width: 100%;
    border-radius: 10px;
    height: 6px;
    background-color: hsl(var(--primary) / 0.5);
    align-items: center;
    .thumb {
        width: var(--thumb-basis);
        height: var(--thumb-basis);
        background-color: hsl(var(--primary));
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`
