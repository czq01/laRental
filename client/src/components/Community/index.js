import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThemeProvider } from '@mui/material/styles';
import { animateScroll as scroll } from 'react-scroll'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';

import { getPostBySearch } from '../../features/posts/postSlice';
import { Container, ImgWrapper, Posts, ScrollTopWrapper, SearchWrapper } from "./styled"
import PostCard from '../PostCard'
import { theme } from '../MuiTheme'
import PostDetail from '../PostDetail';
import houseService from '../../features/houses/houseService';
import { reset } from '../../features/posts/postSlice';
import NoData from '../NoData';
import Loading from '../Loading';

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
            {isLoading ? <Loading /> :
            posts.length === 0 ?
              <NoData message={"Ops. No posts around this location..."}/> : 
            posts.map((post) => (
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