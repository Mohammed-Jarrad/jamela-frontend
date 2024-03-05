import CustomInput from '@/components/my/custom-input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUserContext } from '@/context/UserContextProvider'
import { useUpdateProfile } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { Gender } from '@/types'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { genders } from '../auth/sign-up/sign-up'

type FormData = {
    username: string
    email: string
    file: File | null
    phone: string
    address: string
    gender: Gender
}
const AccountContent = () => {
    const { currentUser } = useUserContext()
    const { mutate: updateProfile, isPending } = useUpdateProfile()

    const [formData, setFormData] = useState<FormData>({
        username: currentUser.username as string,
        email: currentUser.email as string,
        file: null,
        phone: currentUser.phone as string,
        address: currentUser.address as string,
        gender: currentUser.gender as Gender,
    })

    function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target
        if (files && files.length) {
            setFormData((prev) => ({ ...prev, file: files[0] }))
            return
        }
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('form data; ', formData)
        const { address, gender, file, phone, username } = formData
        const formdata = new FormData()
        formdata.append('username', username)
        phone && formdata.append('phone', phone)
        address && formdata.append('address', address)
        gender && formdata.append('gender', gender)
        file && formdata.append('image', file as File)
        updateProfile(formdata)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize max-md:text-center">{currentUser.username} Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleUpdateProfile}>
                    <Flex $items="end" $gap="lg" className="col-span-full my-2 max-md:justify-center">
                        <img
                            src={formData.file ? URL.createObjectURL(formData.file) : currentUser.image?.secure_url}
                            alt={currentUser.username + ' profile image'}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                        <Flex as={Label} $gap="sm" className={cn(buttonVariants({ variant: 'outline' }))}>
                            <Edit2 size={14} /> Edit
                            <Input type="file" className="hidden" onChange={handleChangeInputs} />
                        </Flex>
                    </Flex>
                    <CustomInput
                        label="Name"
                        name="username"
                        placeholder="Enter user name"
                        value={formData.username}
                        onChange={handleChangeInputs}
                        required
                    />
                    <CustomInput
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        disabled
                        onChange={handleChangeInputs}
                        required
                    />
                    <CustomInput
                        label="Address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChangeInputs}
                    />
                    <CustomInput
                        label="Phone"
                        name="phone"
                        placeholder="Enter your phone"
                        value={formData.phone}
                        onChange={handleChangeInputs}
                    />
                    <Flex $items="center" className="col-span-full mt-6 max-sm:text-xs">
                        <Select
                            value={formData.gender}
                            onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Gender (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {genders.map((gender) => (
                                    <SelectItem value={gender.label} key={gender.label}>
                                        <Flex $items="center">
                                            {gender.icon} {gender.label}
                                        </Flex>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="ml-auto w-40 text-base" type="submit" disabled={isPending}>
                            {isPending ? <BeatLoader color="white" size={8} /> : 'Save Changes'}
                        </Button>
                    </Flex>
                </form>
            </CardContent>
        </Card>
    )
}

export default AccountContent
