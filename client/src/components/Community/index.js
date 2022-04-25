import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThemeProvider } from '@mui/material/styles';
import { animateScroll as scroll } from 'react-scroll'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Tooltip from '@mui/material/Tooltip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { getPostBySearch } from '../../features/posts/postSlice';
import { Container, ImgWrapper, Posts, ScrollTopWrapper, SearchWrapper } from "./styled"
import PostCard from '../PostCard'
import { theme } from '../MuiTheme'
import PostDetail from '../PostDetail';
import houseService from '../../features/houses/houseService';
import { reset } from '../../features/posts/postSlice';

function Community() {

  const dispatch = useDispatch()
  const { posts, isSuccess, isError, isLoading, message } = useSelector((state) => (state.posts))
  const [showPosts, setShowPosts] = useState(false)
  const [addr, setAddr] = useState("")
  const handleLocInputChange = (event) => {
    setAddr(event.target.value)
  }

  const [page, setPage] = useState(1)
  const onSearchLocClick = () => {
    if (addr === "") {
      toast.error("Location cannot be empty.")
      return
    }
    const searchData = {
      addr,
      distRange: 5000,  // only get posts with 5km
      page,
      limit: 10 // 10 records once
    }
    dispatch(getPostBySearch(searchData)).then(
      setShowPosts(true)
    )
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(reset())
  }, [isError, isSuccess])

  const [postFocused, setPostFocused] = useState()
  const [houseAttached, setHouseAttached] = useState()
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async (post) => {

    try {
      const house = (await houseService.getHouseById(post.house)).house
      setHouseAttached(house)
      setPostFocused(post)
    } catch (error) {
      toast.error(error.message)
    }
    setOpenModal(true)

  }
  const handleCloseModal = () => setOpenModal(false);

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

  const navigate = useNavigate()
  const toCreatePost = () => {
    navigate('/main/post')
  }


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          BackdropProps={{
            style: {
              backdropFilter: 'blur(10px)'
            }
          }}
        >
          <PostDetail house={houseAttached} post={postFocused} />
        </Modal>
        <SearchWrapper>
          <Stack
            direction='row'
            spacing={.5}
            alignItems='center'
          >
            <TextField
              sx={{ width: "30ch" }}
              variant="standard"
              placeholder='Search posts near a location.'
              onChange={handleLocInputChange}
            />
            <IconButton color="primary" onClick={onSearchLocClick}>
              <SearchIcon />
            </IconButton>
            <Tooltip title="Send Post" arrow>
              <IconButton
                color="primary"
                onClick={toCreatePost}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </SearchWrapper>
        {showPosts ?
          <Posts>
            {posts.length === 0 ?
              <Stack direction='row' spacing={2} alignItems='center'>
                < SentimentVeryDissatisfiedIcon color='primary' fontSize='large' />
                <h1 style={{ color: 'white' }}>
                  Ops. No posts around this location...
                </h1>
              </Stack> : null}
            {posts.map((post) => (
              <PostCard
                onOpenModal={handleOpenModal}
                key={post._id}
                post={post}
              />
            ))}
          </Posts> :
          <ImgWrapper>
            <img
              src={require("../../assets/images/posts.svg").default}
              style={{ height: '60%' }}
            />
          </ImgWrapper>

        }
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