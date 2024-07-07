import Container from '@/components/my/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useCheckCode } from '@/hooks/api/use-auth'
import { yupValidateForm } from '@/lib/yup-validate-form'
import Transition from '@/components/transition'
import { FormEvent, Fragment, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'

const CheckCode = () => {
    const { token } = useParams()
    const [code, setCode] = useState<string>('')
    const checkCodeMutation = useCheckCode()
    function handleCheckCode(e: FormEvent) {
        e.preventDefault()

        const schema = Yup.object().shape({
            code: Yup.string().required('Code is required').length(4, 'Code must be 4 characters'),
        })
        if (!yupValidateForm(schema, { code })) return

        checkCodeMutation.mutate({ code, token: String(token) })
    }

    return (
        <Container className="flex items-center justify-center">
            <Helmet>
                <title>Check Code</title>
            </Helmet>
            <Transition
                initial={{ opacity: 0, y: -70 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full md:w-auto"
            >
                <Card className="w-full md:w-[500px]">
                    <CardHeader>
                        <CardTitle className="text-muted-foreground md:text-2xl">
                            Verify Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="w-full" onSubmit={handleCheckCode}>
                            <div className="flex items-center justify-start">
                                <InputOTP
                                    value={code}
                                    onChange={(value: string) => setCode(value)}
                                    maxLength={4}
                                    render={({ slots }: any) => (
                                        <InputOTPGroup className="gap-2">
                                            {slots.slice(0, 4).map((slot: any, index: number) => (
                                                <Fragment key={index}>
                                                    <InputOTPSlot
                                                        className="rounded-md border"
                                                        {...slot}
                                                    />
                                                    {index !== slots.length - 1 && (
                                                        <InputOTPSeparator />
                                                    )}
                                                </Fragment>
                                            ))}
                                        </InputOTPGroup>
                                    )}
                                />
                            </div>

                            <Button
                                disabled={checkCodeMutation.isPending}
                                className="mt-8 block md:w-[40%]"
                            >
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
