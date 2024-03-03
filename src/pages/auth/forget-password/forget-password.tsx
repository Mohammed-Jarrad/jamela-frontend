import Container from '@/components/my/container'
import CustomInput from '@/components/my/custom-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSendCode } from '@/hooks/use-auth'
import Transition from '@/utils/transition'
import { FormEvent, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>('')
    const sendCodeMutation = useSendCode()
    function handleSendCode(e: FormEvent) {
        e.preventDefault()
        sendCodeMutation.mutate({ email })
    }
    return (
        <Container className="flex items-center justify-center">
            <Transition initial={{ opacity: 0, y: -70 }} animate={{ opacity: 1, y: 0 }} className="w-full md:w-auto">
                <Card className="w-full md:w-[500px]">
                    <CardHeader>
                        <CardTitle className="mb-6 text-muted-foreground md:text-2xl">Forget Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="w-full" onSubmit={handleSendCode}>
                            <CustomInput
                                label="Enter your email to find it"
                                name="email"
                                required
                                placeholder="example@gmail.com"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button disabled={sendCodeMutation.isPending} className="mt-8 block md:w-[40%]">
                                {sendCodeMutation.isPending ? (
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

export default ForgetPassword