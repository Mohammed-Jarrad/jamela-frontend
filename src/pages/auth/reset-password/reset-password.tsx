import Container from '@/components/my/container'
import CustomInput from '@/components/my/custom-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResetPassword } from '@/hooks/use-auth'
import Transition from '@/utils/transition'
import { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
const ResetPassword = () => {
    const { token } = useParams()
    const [newPassword, setNewPassword] = useState<string>('')
    const resetPasswordMutation = useResetPassword()
    function handleResetPassword(e: FormEvent) {
        e.preventDefault()
        resetPasswordMutation.mutate({ newPassword, token: String(token) })
    }

    return (
        <Container className="flex items-center justify-center">
            <Helmet>
                <title>Reset Password</title>
            </Helmet>

            <Transition initial={{ opacity: 0, y: -70 }} animate={{ opacity: 1, y: 0 }} className="w-full md:w-auto">
                <Card className="w-full md:w-[500px]">
                    <CardHeader>
                        <CardTitle className="mb-6 text-muted-foreground md:text-2xl">Reset Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="w-full" onSubmit={handleResetPassword}>
                            <CustomInput
                                label="New password"
                                name="new-password"
                                required
                                placeholder="******"
                                minLength={6}
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button disabled={resetPasswordMutation.isPending} className="mt-8 block md:w-[40%]">
                                {resetPasswordMutation.isPending ? (
                                    <BeatLoader className="text-center" color="white" />
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Transition>
        </Container>
    )
}

export default ResetPassword
