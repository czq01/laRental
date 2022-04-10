import { useState } from 'react'

import { Form } from '../Form.styled'
import { Input, FormWrapper } from './styled'
import { Button } from '../Button.styled'
function SignUp() {

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

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <FormWrapper>
        <Form onSubmit={onSubmit}>
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
          type='submit'
          to='/'
          primary={1}>
          Sign Up
        </Button>
      </FormWrapper>
    </>
  )
}

export default SignUp