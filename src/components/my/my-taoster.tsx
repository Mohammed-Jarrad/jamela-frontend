import { useTheme } from '@/context/ThemeContextProvider'
import { Toaster } from 'sonner'

const MyToaster = () => {
    const { theme } = useTheme()
    const className =
        '!bg-card !border-border !shadow-[0_1px_4px_rgba(0,0,0,0.2)] hover:!shadow-[0_1px_8px_rgba(0,0,0,0.3)] !py-3 !px-4 !rounded-xl'
    return (
        <Toaster
            duration={3000}
            position="bottom-center"
            visibleToasts={6}
            closeButton
            theme={theme}
            richColors
            invert
            className="!bg-red-500"
            toastOptions={{
                className,
                classNames: {
                    title: '!text-muted-foreground font-poppins tracking-tight text-sm',
                },
                closeButton: true,
                actionButtonStyle: {
                    background: 'hsl(var(--muted-foreground) / 15%)',
                    color: 'hsl(var(--muted-foreground))',
                },
            }}
        />
    )
}

export default MyToaster
