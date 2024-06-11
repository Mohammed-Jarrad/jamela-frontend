import { ArrowLeft, ArrowRight } from 'lucide-react'

export const NextElement = () => (
    <div className="swiper-button-next group absolute right-[0.8em] top-1/2 z-10 size-[3em] max-md:size-[2em] max-md:rounded-lg -translate-y-1/2 rounded-2xl transition-all after:hidden bg-black/20 backdrop-blur ring-[0.5px] ring-black/20 select-none centered cursor-pointer">
        <ArrowRight className="!w-8 text-white" />
    </div>
)
export const PrevElement = () => (
    <div className="swiper-button-prev group absolute left-[0.8em] top-1/2 z-10 size-[3em] max-md:size-[2em] max-md:rounded-lg -translate-y-1/2 rounded-2xl transition-all after:hidden bg-black/20 backdrop-blur ring-[0.5px] ring-black/20 select-none centered cursor-pointer">
        <ArrowLeft className="!w-8 text-white " />
    </div>
)
