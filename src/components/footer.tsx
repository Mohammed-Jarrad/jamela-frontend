import Container from './my/container'

const Footer = () => {
    return (
        <div className="bg-muted p-5">
            <Container className="flex items-center justify-between max-md:flex-col max-md:gap-2">
                {/* logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="jamela logo" className="h-16" />
                    <p className="font-semibold">Jamela Fashion</p>
                </div>
                {/* Copy Right */}
                <p className="text-sm text-muted-foreground">
                    Copyright © {new Date().getFullYear()} All Rights Reserved.
                </p>
            </Container>
        </div>
    )
}

export default Footer
