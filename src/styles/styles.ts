import styled, { css } from 'styled-components'

export const Flex = styled.div<{
    $center?: boolean
    $gap?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number
    $direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    $items?: 'center' | 'start' | 'end' | 'baseline' | 'stretch'
    $justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    $wrap?: 'wrap' | 'nowrap'
}>`
    display: flex;
    ${({ $center, $gap = 'md', $direction = 'row', $items, $justify, $wrap }) => css`
        ${$center &&
        css`
            justify-content: center;
            align-items: center;
        `}
        ${$wrap &&
        css`
            flex-wrap: ${$wrap};
        `}
        ${$gap &&
        css`
            gap: ${typeof $gap === 'number'
                ? `${$gap}px`
                : {
                      sm: '3px',
                      md: '8px',
                      lg: '16px',
                      xl: '20px',
                      '2xl': '24px',
                      '3xl': '32px',
                  }[$gap.toString()]};
        `}
        ${$direction &&
        css`
            flex-direction: ${$direction};
        `}
        ${$items &&
        css`
            align-items: ${$items};
        `}
        ${$justify &&
        css`
            justify-content: ${$justify};
        `}
    `}
`
