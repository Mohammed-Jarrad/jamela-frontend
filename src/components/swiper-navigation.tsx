import { ArrowLeft, ArrowRight } from 'lucide-react'

export const NextElement = () => (
    <div className="swiper-button-next group absolute right-[0.8em] top-1/2 z-10 size-[3em] max-md:size-[2em] max-md:rounded-lg -translate-y-1/2 rounded-2xl transition-all after:hidden bg-primary/30 ring-[0.5px] ring-black/20 hover:bg-accent/50 select-none">
        <ArrowRight className="!w-8 text-gray-200 group-hover:text-accent-foreground/50" />
    </div>
)
export const PrevElement = () => (
    <div className="swiper-button-prev group absolute left-[0.8em] top-1/2 z-10 size-[3em] max-md:size-[2em] max-md:rounded-lg -translate-y-1/2 rounded-2xl transition-all after:hidden bg-primary/30 ring-[0.5px] ring-black/20 hover:bg-accent/50 select-none">
        <ArrowLeft className="!w-8 text-gray-200  group-hover:text-accent-foreground/50" />
    </div>
)
