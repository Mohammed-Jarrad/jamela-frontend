import { Button } from '@/components/ui/button'
import { useDeleteImage, useGetImages } from '@/hooks/use-images'
import { cn } from '@/lib/utils'
import { ConstantImages } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import CreateImageDialog from './create-image-dialog'
import ImageCard from './image-card'
import NoDataMessage from '@/components/not-data'

export type ImageTypeProps = ConstantImages['imageType']

const ImagesContent = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const defaultImageType = queryParams.get('imageType') || 'main'
    const navigate = useNavigate()
    const [imageType, setImageType] = useState<ImageTypeProps>(defaultImageType as ImageTypeProps)
    const [openAdd, setOpenAdd] = useState<boolean>(false)

    useEffect(() => {
        queryParams.set('imageType', imageType)
        navigate({ search: queryParams.toString() })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data, isLoading, error } = useGetImages({ imageType })
    const deleteMutation = useDeleteImage()
    const handleErrors = useHandleErrors()

    if (isLoading) return <BeatLoader color="hsl(var(--primary))" className="my-5 text-center" />
    if (error) handleErrors(error)
    if (data)
        return (
            <div className="space-y-5">
                {deleteMutation.isPending && (
                    <BeatLoader color="hsl(var(--primary))" className="my-5 text-center" />
                )}

                <div className="flex divide-x-2 rounded-xl border">
                    <TabItem
                        imageType={imageType}
                        setImageType={setImageType}
                        text="Main images"
                        value="main"
                    />
                    <TabItem
                        imageType={imageType}
                        setImageType={setImageType}
                        text="Banner images"
                        value="banner"
                    />
                </div>

                {data.images.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
                        {data.images.map((image, index) => (
                            <ImageCard
                                key={image._id}
                                image={image}
                                index={index}
                                deleteMutation={deleteMutation}
                            />
                        ))}
                    </div>
                ) : (
                    <NoDataMessage className="mt-12" message="No Images Found" />
                )}
                <Button
                    variant="default"
                    className="sticky bottom-2 mx-auto mt-5 flex w-full md:w-1/3 lg:w-1/4"
                    onClick={() => setOpenAdd(true)}
                >
                    Upload Images
                </Button>
                <CreateImageDialog open={openAdd} setOpen={setOpenAdd} />
            </div>
        )
}

export default ImagesContent

const TabItem = ({
    imageType,
    setImageType,
    text,
    value,
}: {
    imageType: ImageTypeProps
    setImageType: React.Dispatch<React.SetStateAction<ImageTypeProps>>
    text: string
    value: ImageTypeProps
}) => {
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    function handleChangeImagetype(e: React.MouseEvent<HTMLParagraphElement>) {
        const dataValue: ImageTypeProps = e.currentTarget.dataset.value as ImageTypeProps
        setImageType(dataValue)
        queryParams.set('imageType', dataValue as string)
        navigate({ search: queryParams.toString() })
    }

    return (
        <p
            onClick={handleChangeImagetype}
            data-value={value}
            className={cn(
                'flex-1 cursor-pointer select-none px-3 py-1 text-center font-medium text-muted-foreground transition-all hover:text-foreground',
                {
                    '!text-primary': imageType === value,
                }
            )}
        >
            {text}
        </p>
    )
}
