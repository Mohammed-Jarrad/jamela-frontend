import { Button } from '@/components/ui/button'
import { Flex } from '@/styles/styles'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Helmet>
                <title>Not found</title>
            </Helmet>

            <Flex $direction="column" $center={true} className="my-7" $gap="lg">
                <img
                    src="/assets/not-found.svg"
                    alt=""
                    className="mx-auto max-w-full md:max-w-lg"
                />

                <Flex $direction="column" $gap={2} $center={true}>
                    <p className="my-5 font-jost text-6xl font-bold text-primary">
                        Opps <span className="text-destructive">!</span>
                    </p>
                    <p className="text-xl text-muted-foreground">Page not found</p>
                    <p className="text-sm text-muted-foreground md:text-lg">
                        The page you are looking for does not exist
                    </p>
                    <Flex className="mt-3">
                        <Button>
                            <Link to="/">Go Home</Link>
                        </Button>
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default Notfound
