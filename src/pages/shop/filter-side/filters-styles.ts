import styled from 'styled-components'

export const FilterTitle = styled.p`
    font-size: clamp(14px, 17px, 20px);
    text-transform: uppercase;
    white-space: nowrap;
    font-weight: 600;
    color: hsl(var(--text-foreground));
`

export const FilterClear = styled.span<{ hidden?: boolean }>`
    font-size: clamp(12px, 13px, 14px);
    cursor: pointer;
    text-decoration: underline;
    ${({ hidden }) => hidden == true && 'display: none;'}
`

export const Overlay = styled.div.attrs({ className: 'bg-background/10 backdrop-blur-sm' })<{
    $show?: boolean
}>`
    display: ${({ $show }) => ($show ? 'block' : 'none')};
    opacity: ${({ $show }) => ($show ? '1' : '0')};
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    transition: all 0.3s ease-in-out;
    @media (min-width: 768px) {
        display: none;
    }
`
