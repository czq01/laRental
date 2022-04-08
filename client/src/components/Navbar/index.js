import React, { useState, useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import {
	Nav,
	NavbarContainer,
	NavLogo,
	MobileIcon,
	NavMenu,
	NavItem,
	NavLink,
	NavBtn,
	NavBtnLink
} from "./styled.js"
import { FaBars } from 'react-icons/fa'

const menu = ['search', 'sign up', 'post', 'about']
const capFirstLetter = (s) => (
	s[0].toUpperCase() + s.slice(1)
)
const Navbar = () => {

	const [scrollNav, setScrollNav] = useState(false)

	const changeNav = () => {
		if (window.scrollY >= 80) {
			setScrollNav(true)
		} else {
			setScrollNav(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', changeNav)
	}, [])

	const toggleHome = () => {
		scroll.scrollToTop();
	}

	return (
		<>
			<Nav scrollNav={scrollNav}>
				<NavbarContainer>
					<NavLogo to='/' onClick={toggleHome}>laRental</NavLogo>
				</NavbarContainer>
				<MobileIcon>
					<FaBars />
				</MobileIcon>
				<NavMenu>
					{menu.map((item) => (
						<NavItem>
							<NavLink
								to={item}
								smooth={true}
								duration={500}
								spy={true}
								exact={true}
								offset={-80}>
								{capFirstLetter(item)}
							</NavLink>
						</NavItem>
					))}
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/auth/signin'>Sign in</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	)
}

export default Navbar