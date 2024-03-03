import { BeatLoader } from 'react-spinners'
import MainContent from './components/main-content'
import { useUserContext } from './context/UserContextProvider'
import { useGetCurrentUser } from './hooks/use-user'
import { useHandleErrors } from './utils/use-handle-errors'

function App() {
    const { token } = useUserContext()
    const { isLoading, error } = useGetCurrentUser({ enabled: !!token })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)
    if (isLoading)
        return (
            <div className="mt-20 flex w-full justify-center">
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            </div>
        )

    return <MainContent />
}

export default App
