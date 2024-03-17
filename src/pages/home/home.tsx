import { Helmet } from 'react-helmet'
import BestSellers from './best-sellers/best-sellers'
import HomepageCategories from './homepage-categories/homepage-categories'
import NewArrivals from './new-arrivals/new-arrivals'
import Slider from './slider/slider'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Jamela Fashion</title>
            </Helmet>

            <Slider imageType="main" />
            <HomepageCategories />
            <NewArrivals />
            <Slider imageType="banner" />
            <BestSellers />
        </div>
    )
}

export default Home
