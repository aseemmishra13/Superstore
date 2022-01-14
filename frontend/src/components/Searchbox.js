import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const Searchbox = () => {
    const [keyword,setKeyword]=useState('')
    const navigate = useNavigate()
    const submitHandler=(e)=>{
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control type='text' name= 'q' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search products' className='mr-sm-2 ml-sm-5'></Form.Control>
          <Button type='submit' variant='outline-succcess' className='p-2'>Search</Button>  
        </Form>
    )
}

export default Searchbox
