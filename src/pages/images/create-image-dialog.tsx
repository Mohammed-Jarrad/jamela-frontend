import CustomInput from '@/components/my/custom-input'
import RequiredStar from '@/components/required-star'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateNewImage } from '@/hooks/use-images'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { ConstantImages } from '@/types'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const imageTypes = ['Banner', 'Main']
const CreateImageDialog: React.FC<Props> = ({ open, setOpen }) => {
    const { mutate: create, isPending } = useCreateNewImage()
    type Infos = {
        imageType?: ConstantImages['imageType']
        file?: File
        link?: ConstantImages['link']
    }
    const [infos, setInfos] = useState<Infos>({})

    useEffect(() => {
        setInfos({}) // reset
    }, [open])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name, files } = e.target
        if (files && files.length) {
            return setInfos((pre) => ({ ...pre, [name]: files[0] }))
        }
        setInfos((pre) => ({ ...pre, [name]: value }))
    }
    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        setInfos((pre) => ({ ...pre, file }))
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData()
        data.append('imageType', infos.imageType as string)
        infos.link && data.append('link', infos.link as string)
        data.append('image', infos.file as File)
        create(data, {
            onSuccess: () => setOpen(false),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload new image</DialogTitle>
                    <DialogDescription>Upload a new image to your home page.</DialogDescription>
                </DialogHeader>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <Flex
                        $center={true}
                        $direction="column"
                        className="rounded-lg border border-dashed border-muted-foreground px-2 py-6"
                        onDrop={onDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {infos.file ? (
                            <img
                                src={URL.createObjectURL(infos.file)}
                                alt="uploaded image"
                                className="aspect-[16/9] h-52 rounded object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <>
                                <p>Drag and drop here</p>
                                <p>or</p>
                            </>
                        )}
                        <Label className={cn(buttonVariants({ variant: 'outline' }), '')}>
                            <span>Browse file</span>
                            <input className="hidden" type="file" onChange={handleChange} name="file" />
                        </Label>
                    </Flex>

                    <div className="space-y-3 text-muted-foreground">
                        <Label>
                            Image Type <RequiredStar />
                        </Label>
                        <Select
                            required
                            value={infos?.imageType}
                            onValueChange={(value) =>
                                setInfos((pre) => ({ ...pre, imageType: value as ConstantImages['imageType'] }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Image Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {imageTypes.map((imageType) => (
                                    <SelectItem key={imageType} value={imageType.toLowerCase()}>
                                        {imageType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <CustomInput
                        label="image link"
                        value={infos?.link || ''}
                        onChange={handleChange}
                        name="link"
                        placeholder="https://example.com"
                        type="url"
                    />

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <BeatLoader className="text-center" color="white" /> : 'Upload'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateImageDialog
