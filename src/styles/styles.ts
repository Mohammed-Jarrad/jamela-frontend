import styled, { css } from 'styled-components'

const breakpoints: { [key: string]: string } = {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
}

export const mq: { [key: string]: any } = {}

Object.keys(breakpoints).forEach((key, index) => {
    const size = breakpoints[key]
    mq[key] = (...args: any) => css`
        @media (min-width: ${size}) {
            ${css(args)}
        }
    `
    mq[`${key}Only`] = (...args: any) => css`
        @media (min-width: ${size}) and (max-width: ${breakpoints[Object.keys(breakpoints)[index + 1]]}) {
            ${css(args)}
        }
    `
    mq[`${key}Max`] = (...args: any) => css`
        @media (max-width: ${size}) {
            ${css(args)}
        }
    `
})

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
export const ToolTip = styled.div<{ $tooltip?: string; $position?: 'top' | 'bottom' }>`
    ${({ $tooltip, $position = 'top' }) => css`
        position: ${$tooltip?.length && 'relative'};
        &::after {
            content: '${$tooltip}';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            background: hsl(var(--background) / 30%);
            color: hsl(var(--foreground));
            padding: 5px 10px;
            border-radius: var(--radius);
            font-size: 12px;
            opacity: 0;
            transition: all 0.3s ease-in;
            pointer-events: none;
            z-index: 999999;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            -moz-backdrop-filter: blur(8px);
            -ms-backdrop-filter: blur(8px);
            -o-backdrop-filter: blur(8px);
            font-family: 'Poppins', sans-serif;
            border: 1px solid hsl(var(--border));
            ${$position === 'bottom' &&
            css`
                top: 100%;
                bottom: auto;
            `}
        }
        &:hover {
            &::after {
                opacity: 1;
                bottom: 120%;
                ${$position === 'bottom' &&
                css`
                    top: 120%;
                    bottom: auto;
                `};
            }
        }
    `}
`
