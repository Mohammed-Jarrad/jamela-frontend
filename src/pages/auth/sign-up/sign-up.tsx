import Container from '@/components/my/container'
import CustomInput from '@/components/my/custom-input'
import Flex from '@/components/my/flex'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSignup } from '@/hooks/use-auth'
import { Gender, SignupInputsProps } from '@/types'
import { Box } from '@radix-ui/themes'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaFemale, FaMale } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Transition from '../../../utils/transition'

export const genders: { label: Gender; icon: JSX.Element }[] = [
    { label: 'Male', icon: <FaMale /> },
    { label: 'Female', icon: <FaFemale /> },
]
const SignUp = () => {
    const [inputs, setInputs] = useState<SignupInputsProps>({})
    const { mutate: signup, isPending } = useSignup()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signup(inputs)
    }

    return (
        <div className=" w-full py-4">
            <Helmet>
                <title>Jamela Sign Up</title>
            </Helmet>
            <Container className="h-full">
                {/* Form Container */}
                <Transition
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    className="flex h-full items-center justify-center"
                >
                    <Card className="w-full sm:w-[70%] sm:min-w-[600px]">
                        <CardHeader className="mb-8 space-y-2">
                            <CardTitle className="text-center text-3xl">Sign Up</CardTitle>
                            <Flex className="justify-center text-sm">
                                Already have an account?
                                <Link to="/auth/login" className="underline">
                                    Sign In
                                </Link>
                            </Flex>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <Flex gap="lg" className="w-full max-sm:flex-col max-sm:gap-5">
                                    <Box className="flex-1 space-y-5">
                                        <CustomInput
                                            label="User name"
                                            name="username"
                                            required
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            minLength={3}
                                        />
                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            required
                                            type="email"
                                            onChange={handleChange}
                                            placeholder="example@gmail.com"
                                        />
                                        <CustomInput
                                            label="Password"
                                            name="password"
                                            required
                                            type="password"
                                            onChange={handleChange}
                                            placeholder="******"
                                            minLength={6}
                                        />
                                    </Box>
                                    <Box className="flex-1 space-y-5">
                                        <CustomInput
                                            label="Phone number"
                                            name="phone"
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="+972 555 555 555"
                                        />
                                        <CustomInput
                                            label="Address"
                                            name="address"
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="1234 Main St"
                                        />
                                        <Box className="flex flex-col space-y-3">
                                            <Label htmlFor="gender">
                                                Gender <span className="text-xs text-gray-300">(optional)</span>
                                            </Label>
                                            <Select
                                                name="gender"
                                                onValueChange={(value) =>
                                                    setInputs({ ...inputs, gender: value as Gender })
                                                }
                                            >
                                                <SelectTrigger className="flex">
                                                    <SelectValue placeholder="Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genders.map((gender) => (
                                                        <SelectItem value={gender.label} key={gender.label}>
                                                            <Flex gap="sm" align={'center'}>
                                                                {gender.icon} {gender.label}
                                                            </Flex>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Box>
                                    </Box>
                                </Flex>

                                <Flex justify="between" gap="md" className="max-sm:flex-col">
                                    <Button size="lg" type="submit" className="sm:flex-1">
                                        {isPending ? <BeatLoader className="text-center" color="white" /> : 'Sign Up'}
                                    </Button>
                                    <Link
                                        to="/login"
                                        className={buttonVariants({
                                            size: 'lg',
                                            variant: 'ghost',
                                            className: 'border sm:flex-1',
                                        })}
                                    >
                                        Login
                                    </Link>
                                </Flex>
                            </form>
                        </CardContent>
                    </Card>
                </Transition>
            </Container>
        </div>
    )
}

export default SignUp
