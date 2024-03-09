import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Transition from '@/utils/transition'
import ImagesContent from './images-content'

const Images = () => {
    return (
        <Transition>
            <Card>
                <CardHeader>
                    <CardTitle>Site Images</CardTitle>
                </CardHeader>
                <CardContent>
                    <ImagesContent />
                </CardContent>
            </Card>
        </Transition>
    )
}

export default Images
