import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContextProvider'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-180 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-180 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
