import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type ScrollWhenRefreshType = {
	children: React.ReactNode
}
const ScrollWhenRefresh = ({ children }: ScrollWhenRefreshType) => {
	const { key } = useLocation()
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [key])

	return children
}

export default ScrollWhenRefresh
