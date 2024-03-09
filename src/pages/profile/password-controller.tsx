import CustomInput from '@/components/my/custom-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUpdateProfile } from '@/hooks/use-user'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { toast } from 'sonner'

type FormDataProps = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

const PasswordController = () => {
    const { mutate: updatePassword, isPending } = useUpdateProfile()
    const [formData, setFormData] = useState<FormDataProps>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { confirmPassword, newPassword, oldPassword } = formData
        if (confirmPassword !== newPassword) {
            return toast.error('Password does not match')
        }
        const formdata = new FormData()
        formdata.append('oldPassword', oldPassword)
        formdata.append('newPassword', newPassword)
        updatePassword(formdata)
    }

    return (
        <Card>
            <CardHeader className=" max-w-[320px] p-6">
                <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="max-w-[320px] gap-3" onSubmit={handleUpdatePassword}>
                    <CustomInput
                        label="Old Password"
                        name="oldPassword"
                        placeholder="******"
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                    />
                    <CustomInput
                        label="New Password"
                        name="newPassword"
                        placeholder="******"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <CustomInput
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="******"
                        type="password"
                        value={formData.confirmPassword}
                        data-invalid={formData.newPassword !== formData.confirmPassword}
                        className="data-[invalid=true]:text-red-500 data-[invalid=true]:ring-red-500"
                        onChange={handleChange}
                        required
                    />

                    <Link to="/auth/forget-password" className="mt-2 text-sm underline">
                        Forget Password?
                    </Link>

                    <Button className="mt-6 w-40 text-base" type="submit" disabled={isPending}>
                        {isPending ? <BeatLoader color="white" size={8} /> : 'Change Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default PasswordController
