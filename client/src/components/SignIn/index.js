
import { useState } from 'react'

import { Form } from '../Form.styled'
import { Input, FormWrapper } from './styled'
import { Button } from '../Button.styled'
function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password} = formData;

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
          to='/'
          type='submit'
          primary={1}>
          Sign In
        </Button>
      </FormWrapper>
    </>
  )
}

export default SignIn