import BannerSlider from './banner-slider/banner-slider'
import BestSellers from './best-sellers/best-sellers'
import HomepageCategories from './homepage-categories/homepage-categories'
import NewArrivals from './new-arrivals/new-arrivals'

const Home = () => {
    return (
        <div>
            {/* TODO: main Image */}
            <div>
                <img loading="lazy" src="/test/home-bg.jpg" alt="home bg" className="mx-auto min-h-[200px] object-cover" />
            </div>
            <HomepageCategories />
            <NewArrivals />
            <BannerSlider />
            <BestSellers />
        </div>
    )
}

export default Home
