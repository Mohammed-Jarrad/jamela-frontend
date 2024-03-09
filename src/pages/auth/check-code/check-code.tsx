import Container from '@/components/my/container'
import CustomInput from '@/components/my/custom-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCheckCode } from '@/hooks/use-auth'
import Transition from '@/utils/transition'
import { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const CheckCode = () => {
    const { token } = useParams()
    const [code, setCode] = useState<string>('')
    const checkCodeMutation = useCheckCode()
    function handleCheckCode(e: FormEvent) {
        e.preventDefault()
        checkCodeMutation.mutate({ code, token: String(token) })
    }
    return (
        <Container className="flex items-center justify-center">
            <Helmet>
                <title>Check Code</title>
            </Helmet>
            <Transition initial={{ opacity: 0, y: -70 }} animate={{ opacity: 1, y: 0 }} className="w-full md:w-auto">
                <Card className="w-full md:w-[500px]">
                    <CardHeader>
                        <CardTitle className="mb-6 text-muted-foreground md:text-2xl">Verify Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="w-full" onSubmit={handleCheckCode}>
                            <CustomInput
                                label="Enter the code"
                                name="code"
                                required
                                placeholder="XXXX"
                                type="text"
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Button disabled={checkCodeMutation.isPending} className="mt-8 block md:w-[40%]">
                                {checkCodeMutation.isPending ? (
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

export default CheckCode
