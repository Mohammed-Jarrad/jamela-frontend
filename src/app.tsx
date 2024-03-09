import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import MainContent from './components/main-content'
import { useUserContext } from './context/UserContextProvider'
import { useGetCurrentUser } from './hooks/use-user'
import { useHandleErrors } from './utils/use-handle-errors'

function App() {
    const { token } = useUserContext()
    const { isLoading, error } = useGetCurrentUser({ enabled: !!token })
    const handleErrors = useHandleErrors()
    if (error) {
        handleErrors(error)
    }
    if (isLoading)
        return (
            <div className="mt-20 flex w-full justify-center">
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            </div>
        )

    return (
        <>
            <Helmet>
                <title>Jamela Fashion</title>
                <meta name="description" content="Welcome to Jamela Fashion" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/logo.ico" /> */}
            </Helmet>

            <MainContent />
        </>
    )
}

export default App
