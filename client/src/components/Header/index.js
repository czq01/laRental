import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import { theme } from '../MuiTheme'
import { logout, reset } from '../../features/auth/authSlice'
import {
  StyledHeader,
  Website,
  User,
  Wrapper,
  Logo,
  SiteItem,
} from "./styled"

function Header({ headerTrans }) {
  const { user } = useSelector((state) => (state.auth))
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
  }

  const navigate = useNavigate()
  const onToDashboard = () => {
    navigate('dashboard')
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledHeader headerTrans={headerTrans}>
        <Website>
          <Wrapper>
            <Logo>
              <h1>la<span>R</span>ental</h1>
            </Logo>
            <SiteItem>
              <Link to='/main/search'>HOUSE</Link>
            </SiteItem>
            <SiteItem>
              <Link to='/main/community'>COMMUNITY</Link>
            </SiteItem>
          </Wrapper>
        </Website>
        <User>
          {user ?
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <AccountCircleIcon
                      sx={{ width: 32, height: 32 }}
                      color='secondary'
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                <MenuItem>
                  <ListItemIcon onClick={onToDashboard}>
                    <ArticleIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" color="primary" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
            : <Button
              variant="text"
              component={Link}
              color='secondary'
              to='/auth/signin'>
              Log in.
            </Button>
          }

        </User>
      </StyledHeader>
    </ThemeProvider>
  )
}

export default Header