import { cn } from '@/lib/utils'

interface ContainerProps extends React.ComponentProps<'div'> {}

const Container = ({ className, ...rest }: ContainerProps) => {
    return <div className={cn('container', className)} {...rest} />
}

export default Container
