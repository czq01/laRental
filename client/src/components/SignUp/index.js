import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { register, reset } from '../../features/auth/authSlice'
import { Form } from '../Form.styled'
import { Input, FormWrapper } from './styled'
import { Button } from '../Button.styled'

function SignUp() {

  // State to handle sign up input change
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pwdConfirm: '',
  })

  const { name, email, password, pwdConfirm } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    user, 
    isLoading, 
    isError, 
    isSuccess, 
    message
  } = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/main/search')
    }

    dispatch(reset())

  }, [
    user,
    isError, 
    isSuccess, 
    isLoading, 
    message, 
    navigate, 
    dispatch
  ])

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== pwdConfirm) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, email, password
      }
      dispatch(register(userData))
    }
  }

  return (
    <>
      <FormWrapper>
        <Form >
          <Input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='Username'
            onChange={onChange}
          />
          <Input
            type='text'
            id='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
          />
          <Input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onChange}
          />
          <Input
            type='password'
            id='pwdConfirm'
            name='pwdConfirm'
            value={pwdConfirm}
            placeholder='Confirm Password'
            onChange={onChange}
          />
        </Form>
        <Button
          onClick={onSubmit}
          //type='submit'
          to='/main/search'
          primary={'true'}>
          Sign Up
        </Button>
      </FormWrapper>
    </>
  )
}

export default SignUp