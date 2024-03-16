import Container from './my/container'

const Footer = () => {
    return (
        <div className="bg-muted px-5 py-10">
            <Container className="grid grid-cols-3">
                {/* logo */}
                <div>
                    <p className="font-poppins font-semibold">Jamela Fashion</p>
                    <img src="/logo.svg" alt="jamela logo" className="h-32" />
                </div>
                {/* pages */}
                <div>Pages</div>
                {/* social */}
                <div>Social</div>
            </Container>
        </div>
    )
}

export default Footer
