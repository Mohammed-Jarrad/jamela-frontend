import CustomInput from '@/components/my/custom-input'
import RequiredStar from '@/components/required-star'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateImage } from '@/hooks/use-images'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { ConstantImages } from '@/types'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { imageTypes } from './create-image-dialog'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    image: ConstantImages
}

const EditImageDialog: React.FC<Props> = ({ open, setOpen, image }) => {
    const { mutate: update, isPending } = useUpdateImage()
    type Infos = {
        imageType?: ConstantImages['imageType']
        file?: File
        link?: ConstantImages['link']
    }
    const [infos, setInfos] = useState<Infos>({
        imageType: image.imageType,
        link: image.link ?? '',
    })

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
        infos.imageType !== image.imageType && data.append('imageType', infos.imageType as string)
        infos.link && infos.link !== image.link && data.append('link', infos.link as string)
        infos.file && data.append('image', infos.file as File)
        update(
            { id: image._id, infos: data },
            {
                onSuccess: () => setOpen(false),
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit image</DialogTitle>
                    <DialogDescription>Edit the image details and upload a new one if needed.</DialogDescription>
                </DialogHeader>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <Flex
                        $center={true}
                        $direction="column"
                        className="rounded-lg border border-dashed border-muted-foreground px-2 py-6"
                        onDrop={onDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {infos.file || image.secure_url ? (
                            <img
                                src={infos.file ? URL.createObjectURL(infos.file) : image.secure_url}
                                alt="uploaded image"
                                className="aspect-[16/9] max-h-52 rounded object-cover"
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

export default EditImageDialog
