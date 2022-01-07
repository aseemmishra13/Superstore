import React,{useEffect,useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'


const RegisterScreen = () => {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setconfirmPassword]=useState('')
    const userLogin = useSelector(state=>state.userLogin)
    const user = useSelector(state=>state.userRegister)
    const {userInfo} = userLogin
    const {loading,error} = user
    const navigate=useNavigate()
    const dispatch =useDispatch()
    useEffect(()=>{
if(userInfo){
    navigate('/')

}
    },[navigate,userInfo])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmpassword){
            alert('Enter the same password in both field')
        }
        else
        {dispatch(register(name,email,password))
        navigate('/login')}
    }
    return (
        <FormContainer>
            <h1>Register</h1>
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
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password again' value={confirmpassword} onChange={(e)=> setconfirmPassword(e.target.value)} required></Form.Control>
                </Form.Group>
                <Button type ='submit' variant='primary'>Register</Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
