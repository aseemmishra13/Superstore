import React,{useEffect,useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { register,getProfile, getUserDetails ,updateUser} from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../types/types'


const UserEditScreen = () => {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [isAdmin,setIsAdmin]=useState(false)
    
    const userDetails = useSelector(state=>state.userDetails)
     
    const {user,loading,error} = userDetails
    const userUpdate = useSelector(state=>state.userUpdate)
     
    const {success:successUpdate,loading:loadingUpdate,error:errorUpdate} = userUpdate
    
    const navigate=useNavigate()
    const {id} = useParams()
    const dispatch =useDispatch()
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userList')
        }else{
            if(!user.name || user._id !== id){
                dispatch(getUserDetails(id))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }}
    },[user,dispatch,successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateUser({_id:id,name,email,isAdmin}))
       
    }
    return (
        <>
        <Link to= '/admin/userList' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
           
            <h1>Edit User</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading&&<Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>name </Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin'>
                    
                    <Form.Check type='checkbox' label='isAdmin' checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)} ></Form.Check>
                </Form.Group>
               
                <Button type ='submit' variant='primary'>Update</Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default UserEditScreen
