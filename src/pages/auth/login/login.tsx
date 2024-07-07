import Checkbox from '@/components/my/checkbox'
import Container from '@/components/my/container'
import CustomInput from '@/components/my/custom-input'
import Flex from '@/components/my/flex'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { LoginInputsProps, useLogin } from '@/hooks/api/use-auth'
import { cn } from '@/lib/utils'
import { yupValidateForm } from '@/lib/yup-validate-form'
import Transition from '@/components/transition'
import useHandleMessages from '@/hooks/use-handle-query-messages'
import { Box } from '@radix-ui/themes'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'

const Login = () => {
    useHandleMessages()

    const [inputs, setInputs] = useState<LoginInputsProps>({
        email: '',
        password: '',
    })
    const [remember, setRemember] = useState<boolean>(false)
    const { mutate: login, isPending } = useLogin()
    useEffect(() => {
        const savedEmail = Cookies.get('email')
        const savedPassword = Cookies.get('password')
        if (savedEmail && savedPassword) {
            setInputs({ ...inputs, email: savedEmail, password: savedPassword })
            setRemember(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const schema = Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required').min(6),
        })
        if (!yupValidateForm(schema, inputs)) return

        login(inputs)
        if (remember) {
            Cookies.set('email', inputs?.email as string, { expires: 30 })
            Cookies.set('password', inputs?.password as string, { expires: 30 })
        } else {
            Cookies.remove('email')
            Cookies.remove('password')
        }
    }

    return (
        <div className=" w-full">
            <Helmet>
                <title>Jamela Sign In</title>
            </Helmet>

            <Container className="h-full">
                {/* Form Container */}
                <Transition
                    initial={{ opacity: 0, x: 70 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -70 }}
                    className="flex h-full items-center justify-center"
                >
                    <Card className="w-[400px]">
                        <CardHeader>
                            <CardTitle className="text-center text-3xl">Sign In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <CustomInput
                                    label="Email"
                                    name="email"
                                    value={inputs?.email}
                                    isRequired
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    type="text"
                                    className=""
                                />
                                <CustomInput
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    value={inputs?.password}
                                    type="password"
                                    isRequired
                                    placeholder="******"
                                />

                                <Flex justify="between">
                                    <Link
                                        to={'/auth/forget-password'}
                                        className="text-sm underline"
                                    >
                                        forget password?
                                    </Link>
                                    <Label className="flex cursor-pointer items-center gap-2">
                                        <span className="text-xs ">Remember me</span>
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            className="size-4"
                                            checked={remember}
                                            onChange={() => setRemember((p) => !p)}
                                        />
                                    </Label>
                                </Flex>

                                <Box className="flex justify-between gap-2 max-sm:flex-col">
                                    <Button size="lg" type="submit" className="sm:flex-1">
                                        {isPending ? (
                                            <BeatLoader className="text-center" color="white" />
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                    <Link
                                        to="/signup"
                                        className={cn(
                                            buttonVariants({
                                                size: 'lg',
                                                variant: 'ghost',
                                            }),
                                            'border sm:flex-1'
                                        )}
                                    >
                                        Create Account
                                    </Link>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Transition>
            </Container>
        </div>
    )
}

export default Login
