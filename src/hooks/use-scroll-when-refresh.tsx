import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollWhenRefresh() {
    const { key } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [key])
    return null
}