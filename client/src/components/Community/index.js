import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThemeProvider } from '@mui/material/styles';
import { animateScroll as scroll } from 'react-scroll'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { Container, CreatePostWrapper, Posts, ScrollTopWrapper } from "./styled"
import PostCard from '../PostCard'
import { theme } from '../MuiTheme'

function Community() {

  const mockList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  const [showScrollTop, setShowScrollTop] = useState(false)

  const toggleShowScrollTop = () => {
    if (window.scrollY >= 200) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleShowScrollTop)
  }, [])

  const scrollTop = () => {
    scroll.scrollToTop();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Posts>
          <IconButton
            color="primary"
            component={Link}
            to='/main/post/create'>
            <AddCircleIcon
              sx={{ fontSize: 60 }} />
          </IconButton>
          {mockList.map(() => (
            <PostCard />
          ))}
        </Posts>
        {showScrollTop ?
          <ScrollTopWrapper onClick={scrollTop}>
            <ArrowCircleUpIcon
              color='primary'
              sx={{ fontSize: 60 }}
            />
          </ScrollTopWrapper> : null}

      </Container>
    </ThemeProvider>
  )
}

export default Community