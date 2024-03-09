import BestSellers from './best-sellers/best-sellers'
import HomepageCategories from './homepage-categories/homepage-categories'
import NewArrivals from './new-arrivals/new-arrivals'
import Slider from './silder/silder'

const Home = () => {
    return (
        <div>
            <Slider imageType="main" />
            <HomepageCategories />
            <NewArrivals />
            <Slider imageType="banner" />
            <BestSellers />
        </div>
    )
}

export default Home
