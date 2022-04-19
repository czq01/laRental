
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { login, reset } from '../../features/auth/authSlice'
import { Form } from '../Form.styled'
import { Input, FormWrapper } from './styled'
import { Button } from '../Button.styled'
function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {

      toast.error(message)
    }

    if (isSuccess) {
      navigate('/main/search')
      dispatch(reset())
    }



  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch])


  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Eamil can not be emtpy")
    } else if (!password) {
      toast.error("Password can not be empty")
    } else {
      const userData = {
        email,
        password
      }
      dispatch(login(userData))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
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
        </Form>
        <Button
          to='/main/search'
          onClick={onSubmit}
          primary={'true'}>
          Sign In
        </Button>
      </FormWrapper>
    </ThemeProvider>
  )
}

export default SignIn