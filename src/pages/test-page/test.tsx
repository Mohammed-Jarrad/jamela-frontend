import styled from 'styled-components'
import CreateProduct from '../Admin/products/create-product/create-product'

const Container = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
`

const Test = () => {
    return (
        <div className="p-2">
            <CreateProduct />
        </div>
    )
}

export default Test
