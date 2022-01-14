import React,{useEffect} from 'react'
import { Row ,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { listProduct } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousal from '../components/ProductCarousal'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
    const dispatch = useDispatch()
    const {keyword}=useParams()
    const {pageNumber}=useParams() || 1
    const productList = useSelector(state => state.productList)
    const {loading,error,products,page,pages}=productList
    useEffect(()=>{
        dispatch(listProduct(keyword, pageNumber))
    },[dispatch,keyword,pageNumber])

       
    return (
        <>
        <Helmet>
            <title>Welcome to Superstore | Home </title>
            
        </Helmet>
        {!keyword ? <ProductCarousal/> : <Link to='/' className='btn btn-light'>Back</Link>}
        <h1>Latest Products</h1>
        {loading ? <Loader />:error ? <Message variant = 'danger'/>:(<> <Row>
            {products.map(product=>(
                <Col key = {product._id} sm={12} md={6} lg={4} xl={3}>
                <Product  product={product}/>
                </Col>
            ))}
        </Row>
                <Paginate pages={pages} page={page} keyword={keyword?keyword:''}/>
        </>)}
        
            
        </>
    )
}

export default HomeScreen
