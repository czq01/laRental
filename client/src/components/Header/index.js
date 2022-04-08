import { Link } from 'react-router-dom'
import { Container } from '../../pages/Main/styled'

import {
  StyledHeader,
  Website,
  User,
  Wrapper,
  Logo,
  SiteItem,
} from "./styled"

function Header() {
  return (
    <>
      <StyledHeader>
        <Website>
          <Wrapper>
            <Logo>
              <h1>laRental</h1>
            </Logo>
            <SiteItem>
              <Link to='/main/search'>House</Link>
            </SiteItem>
            <SiteItem>
              <Link to='/main/community'>Community</Link>
            </SiteItem>
          </Wrapper>
        </Website>
        <User>
          <Wrapper>
            
          </Wrapper>
        </User>
      </StyledHeader>
    </>
  )
}

export default Header