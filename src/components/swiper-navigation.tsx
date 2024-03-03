import { ArrowLeft, ArrowRight } from 'lucide-react'

export const NextElement = () => (
    <div className="swiper-button-next group absolute right-[0.8em] top-1/2 z-10 h-[3em] w-[3em] -translate-y-1/2 rounded-2xl transition-all after:hidden hover:bg-accent/50">
        <ArrowRight className="!w-8 text-white shadow-black drop-shadow-2xl group-hover:text-accent-foreground/50" />
    </div>
)
export const PrevElement = () => (
    <div className="swiper-button-prev group absolute left-[0.8em] top-1/2 z-10 h-[3em] w-[3em] -translate-y-1/2 rounded-2xl transition-all after:hidden hover:bg-accent/50">
        <ArrowLeft className="!w-8 text-white shadow-black drop-shadow-2xl  group-hover:text-accent-foreground/50" />
    </div>
)
