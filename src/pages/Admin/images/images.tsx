import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Transition from '@/components/transition'
import ImagesContent from './images-content'
import DashTitle from '@/components/dash-title'

const Images = () => {
    return (
        <Transition>
            <DashTitle title="Site Images" />
            <ImagesContent />
        </Transition>
    )
}

export default Images
