import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'
type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}
type ThemeProviderType = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export default function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderType) {
    const [theme, setTheme] = useState<Theme>((localStorage.getItem(storageKey) as Theme) || defaultTheme)

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        if (theme == 'system') {
            const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.classList.add(systemTheme)
            return
        }
        root.classList.add(theme)
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: (theme: Theme) => {
                    localStorage.setItem(storageKey, theme)
                    setTheme(theme)
                },
            }}
            {...props}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === null) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
