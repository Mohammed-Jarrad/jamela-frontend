import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const AdminOrders = () => {
    return (
        <div>
            <Helmet>
                <title>Admin Orders</title>
            </Helmet>

            <div>
                <p>admin orders</p>

                <Link to={'/test'} state={{ test: 'hello', test2: 'hello2', test3: 'hello3' }}>
                    test page
                </Link>
            </div>
        </div>
    )
}

export default AdminOrders
