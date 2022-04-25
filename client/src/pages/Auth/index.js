import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import {
  Container,
  FormContainer,
  Header,
  LeftBall,
  RightBall,
  ToggleLine,
} from './styled'

function Auth() {

  const {pathname} = useLocation()
  const [isSignIn, setIsSignIn] = useState(pathname.endsWith('signin'));

  const toggleSign = () => {
    setIsSignIn(!isSignIn);
  }

  return (
    <>
      <Container>
        <LeftBall></LeftBall>
        <RightBall></RightBall>
        <FormContainer>
          <Header>
            <h1>
              {isSignIn ? 'Sign in.' : 'Sign up.'}
            </h1>
          </Header>
          <Routes>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
          <ToggleLine>
            {isSignIn ? 
            <p>
              Don't have an account? <Link onClick={toggleSign} to='signup'>Create Account</Link>
            </p> :
            <p>
              Already Signed Up? <Link onClick={toggleSign} to='signin'>Sign In Now</Link>  
            </p>}
          </ToggleLine>
        </FormContainer>
      </Container>
    </>
  )
}

export default Auth