import { useTheme } from '@/context/ThemeContextProvider'
import { Toaster } from '../ui/sonner'

const MyToaster = () => {
    const { theme } = useTheme()
    const className =
        '!bg-card !border-border !shadow-[0_1px_4px_rgba(0,0,0,0.2)] !py-2 !px-4 hover:!py-2 hover:!px-4 !rounded-xl'
    return (
        <Toaster
            duration={3000}
            position="top-center"
            theme={theme}
            richColors
            className="!bg-red-500"
            toastOptions={{
                className,
                classNames: {
                    title: '!text-muted-foreground font-poppins tracking-tight',
                },
            }}
        />
    )
}

export default MyToaster
