import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserContext } from '@/context/UserContextProvider'
import { Flex } from '@/styles/styles'
import Transition from '@/utils/transition'
import { useNavigate } from 'react-router-dom'
import AccountContent from './account-content'
import PasswordController from './password-controller'
import UserOrders from './user-orders'

const Profile = () => {
    const { currentUser } = useUserContext()
    const queryParams = new URLSearchParams(window.location.search)
    const defaultTab = queryParams.get('tab') ?? 'account'
    const navigateToTab = useNavigate()

    function handleClickTab(tabValue: string) {
        queryParams.set('tab', tabValue)
        navigateToTab(`/profile?${queryParams.toString()}`, { replace: true })
    }

    return (
        <Transition className="container my-5 lg:my-12">
            <Flex $justify={'center'}>
                <Tabs defaultValue={defaultTab} className="w-full md:container">
                    <TabsList className="flex items-center gap-2">
                        <TabsTrigger className="flex-1" value="account" onClick={() => handleClickTab('account')}>
                            Account
                        </TabsTrigger>
                        <TabsTrigger className="flex-1" value="password" onClick={() => handleClickTab('password')}>
                            Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <AccountContent />
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordController />
                    </TabsContent>
                </Tabs>
            </Flex>

            {currentUser?.role === 'User' && <UserOrders />}
        </Transition>
    )
}

export default Profile
