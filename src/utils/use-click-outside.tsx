import { useEffect, useRef } from 'react'

const useClickOutside = (callback: () => void): React.RefObject<any> => {
    const ref = useRef<HTMLElement>(null)
    const handler = (e: MouseEvent) => {
        if (!ref.current?.contains(e.target as Node)) {
            callback()
        }
    }
    useEffect(() => {
        window.addEventListener('mousedown', handler)
        return () => window.removeEventListener('mousedown', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}

export default useClickOutside
