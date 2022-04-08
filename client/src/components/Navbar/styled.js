import styled from 'styled-components'
import { Link as LinkRouter} from 'react-router-dom'
import { Link as LinkScroll} from 'react-scroll'

export const Nav = styled.nav`
    background: ${({ scrollNav }) => (
        scrollNav ? '#000' : 'transparent'
    )};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    flex: 1;
`;

export const NavLogo = styled(LinkRouter)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-align: center;
    flex: 1;

    & > li {
        flex: 1
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li`
    height: 80px;
    /* min-width: 7%; */
    white-space: nowrap;
    /* margin: 0 5px; */
`;

export const NavLink = styled(LinkScroll)`
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 0, 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        border-bottom: 3px solid #01bf71;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(LinkRouter)`
    border-radius: 50px;
    background-color: #01bf71;
    white-space: nowrap;
    margin-right: 30px;
    padding: 10px 22px;
    text-decoration: none;
    color: #fff;
`;



