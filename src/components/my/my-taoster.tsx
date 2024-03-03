import { useTheme } from '@/context/ThemeContextProvider'
import { Toaster } from '../ui/sonner'

const MyToaster = () => {
    const { theme } = useTheme()
    const className = '!bg-card !border-border !shadow-[0_1px_4px_rgba(0,0,0,0.2)] '
    return (
        <Toaster
            // closeButton={true}
            duration={3000}
            position="top-center"
            theme={theme}
            richColors
            toastOptions={{
                className,
                classNames: {
                    title: '!text-foreground/60 !text-sm md:!text-base',
                    // closeButton:
                    //     '!text-foreground/60 hover:!text-foreground !border-foreground/10 !bg-card !absolute !top-4 !right-1 !left-auto',
                },
            }}
        />
    )
}

export default MyToaster
