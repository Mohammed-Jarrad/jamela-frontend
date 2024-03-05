import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserContext } from '@/context/UserContextProvider'
import { Flex } from '@/styles/styles'
import Transition from '@/utils/transition'
import AccountContent from './account-content'
import PasswordController from './password-controller'
import UserOrders from './user-orders'

const Profile = () => {
    const { currentUser } = useUserContext()

    return (
        <Transition className="container my-5 lg:my-12">
            <Flex $justify={'center'}>
                <Tabs defaultValue="account" className="w-full md:container">
                    <TabsList className="flex items-center gap-2">
                        <TabsTrigger className="flex-1" value="account">
                            Account
                        </TabsTrigger>
                        <TabsTrigger className="flex-1" value="password">
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

            {currentUser?.role == 'User' && <UserOrders />}
        </Transition>
    )
}

export default Profile
