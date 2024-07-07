import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserContext } from '@/context/UserContextProvider'
import { Flex } from '@/styles/styles'
import Transition from '@/components/transition'
import { useNavigate } from 'react-router-dom'
import AccountContent from './components/account-content'
import PasswordController from './components/password-controller'
import UserOrders from './components/user-orders'

const Profile = () => {
    const { currentUser } = useUserContext()
    const queryParams = new URLSearchParams(window.location.search)
    const defaultTab = queryParams.get('tab') ?? 'account'
    const navigateToTab = useNavigate()

    function handleClickTab(tabValue: string) {
        queryParams.set('tab', tabValue)
        navigateToTab({ search: queryParams.toString() })
    }

    return (
        <Transition className="container my-5">
            <Flex $justify={'center'}>
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="flex items-center gap-2">
                        <TabsTrigger
                            className="flex-1"
                            value="account"
                            onClick={() => handleClickTab('account')}
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex-1"
                            value="password"
                            onClick={() => handleClickTab('password')}
                        >
                            Password
                        </TabsTrigger>
                        {currentUser.role == 'User' && (
                            <TabsTrigger
                                className="flex-1"
                                value="orders"
                                onClick={() => handleClickTab('orders')}
                            >
                                Orders
                            </TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="account">
                        <AccountContent />
                    </TabsContent>
                    <TabsContent value="password">
                        <PasswordController />
                    </TabsContent>
                    {currentUser.role == 'User' && (
                        <TabsContent value="orders">
                            <UserOrders />
                        </TabsContent>
                    )}
                </Tabs>
            </Flex>
        </Transition>
    )
}

export default Profile
