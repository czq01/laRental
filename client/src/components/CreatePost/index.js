import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ArticleIcon from '@mui/icons-material/Article';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Modal from '@mui/material/Modal';


import { theme } from '../MuiTheme'
import {
  Container,
  Form,
  HeaderWrapper,
  ToggleBtnWrapper,
} from "./styled"
import { Button } from '../Button.styled'
import houseService from '../../features/houses/houseService';
import { createPost, reset } from '../../features/posts/postSlice'
import AddHouse from '../AddHouse';
function CreatePost() {

  const { isSuccess, isLoading, isError, message } = useSelector((state) => (state.posts))
  const { data: { houses } } = useSelector((state) => (state.houses))
  const [alignment, setAlignment] = useState('roommate');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [addrs, setAddrs] = useState()
  const [showList, setShowList] = useState(false)
  const searchLoc = async (event) => {
    const addr = event.target.value
    if (!addr) {
      toast.error("Location cannot be empty...")
      return
    }
    try {
      const result = await houseService.getHousesByLoc({
        addr,
        distRange: 0.5  // check houses within .5 km
      })
      if (!result.success) throw Error(result.message)
      const addrs = result.addrs
      setAddrs(addrs)
      setShowList(true)
      event.target.value = ''
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [chosenHouse, setChosenHouse] = useState()
  const onChooseAddr = (house) => {
    setShowList(false)
    console.log(house)
    setChosenHouse(house)
  }

  const [requirements, setRequirements] = useState({
    desc: '',
    comment: '',
    male: 0,
    female: 0,
    other: 0,
    none: 0,
  })

  const onInputChange = (e) => {
    setRequirements((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onPublicPost = (e) => {
    e.preventDefault()
    if (chosenHouse) {
      const { desc, comment, male, female, other, none } = requirements
      const postData = {
        type: alignment,
        house_id: chosenHouse._id,
        desc,
      }
      if (alignment === 'roommate') {

        if (male + female + other + none === 0) {
          toast.error("Roommate number is required.")
          return
        } else {
          const people = []

          for (let i = 0; i < female; i++) {
            people.push('female');
          }

          for (let i = 0; i < male; i++) {
            people.push('male');
          }

          for (let i = 0; i < other; i++) {
            people.push('other');
          }

          for (let i = 0; i < none; i++) {
            people.push('none');
          }

          const requirements = {
            people,
            comment,
          }

          postData.requirements = requirements
        }
      }
      dispatch(createPost(postData))
    } else {
      toast.error("Attaching a house to your post is required.")
      return
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('?') != -1) {
      const addPost = window.location.href.substring(1 + window.location.href.indexOf('?'),).replace(/%20/g, ' ')
      const chosenHouse = { "_id": addPost, "addr": (houses.filter((house) => (house._id === addPost))[0]).location.formattedAddr }
      setChosenHouse(chosenHouse)
    }
  }, [houses])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } else if (isSuccess) {
      navigate('/main/community')
    }
    dispatch(reset())
  }, [isSuccess, isError, message,])

  // Model for adding house resouce
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal =  () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const onNewHouseAdded = (house) => {
    setChosenHouse({
      "_id": house._id,
      "addr": house.location.formattedAddr,
    })
    setOpenModal(false)
    setShowList(false)
  }


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          BackdropProps={{
            style: {
              backdropFilter: 'blur(20px)'
            }
          }}
        >
          <AddHouse onNewHouseAdded={onNewHouseAdded}/>
        </Modal>
        <Form>
          <Stack spacing={15}
            alignItems='center'
            sx={{ width: '100%' }}>
            <HeaderWrapper>
              <ArticleIcon fontSize='small' color='primary' />
              <h1> Add a post.</h1>
            </HeaderWrapper>

            <ToggleBtnWrapper>
              <ToggleButtonGroup
                color="neutral"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton color="primary" value="roommate">Find Roommate</ToggleButton>
                <ToggleButton color="primary" value="transfer">Transfer</ToggleButton>
              </ToggleButtonGroup>
            </ToggleBtnWrapper>

            {chosenHouse ?
              <>
                <Stack
                  sx={{ width: '70%' }}
                  spacing={2}
                  direction='row'
                  justifyContent='center'
                  alignItems='center'>
                  <GpsFixedIcon color='primary' />
                  <div style={{ color: 'white', lineHeight: '25px' }}>
                    House at :
                    <span style={{ fontWeight: 'bolder' }}>
                      {chosenHouse.addr}
                    </span> has attached to your post.
                  </div>
                </Stack>
              </> : null}


            <Input
              placeholder={`Press ENTER to ${chosenHouse ? "change location" : "search a location"}.`}
              sx={{ width: '50%', textAlign: 'center' }}
              // id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LocationOnIcon color='primary' />
                </InputAdornment>
              }
              onKeyUp={event => event.key === 'Enter' ? searchLoc(event) : null}
            />
            {showList ?
              <List
                sx={{
                  overflow: 'auto',
                  maxHeight: 200,
                  width: '50%',
                }}>
                <ListItem
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'secondary',
                      fontWeight: 'medium',
                      variant: 'body2',
                    }}
                    primary={`Found ${addrs.length} record${addrs.length > 1 ? 's' : ''}`}
                  />
                </ListItem>
                {addrs.map((item) => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => onChooseAddr(item)}>
                        <CheckIcon color='primary' />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        color: 'primary',
                        fontWeight: 'medium',
                        variant: 'body2',
                      }}
                      primary={item.addr}
                    />
                  </ListItem>
                ))}
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={handleOpenModal}>
                      <AddCircleIcon color='primary' />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'medium',
                      variant: 'body2',
                    }}
                    primary="Can't find an existing location? Add one"
                  />
                </ListItem>
              </List>
              : null
            }

            <Input
              placeholder="Say something about your house"
              name='desc'
              onChange={onInputChange}
              sx={{ width: '50%' }}
              startAdornment={
                <InputAdornment position="start">
                  <HomeWorkIcon color='primary' />
                </InputAdornment>
              }
              multiline
            />

            {
              alignment === 'roommate' ?
                <>
                  <Stack
                    sx={{ width: '100%' }}
                    spacing={4}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'>
                    <Input
                      placeholder='# Male'
                      name='male'
                      type="text"
                      pattern="[0-9]*"
                      onChange={onInputChange}
                      sx={{ width: 'auto' }}
                      startAdornment={
                        <InputAdornment position="start">
                          <HotelIcon color='primary' />
                        </InputAdornment>
                      }
                    />
                    <Input
                      placeholder='# Female'
                      name='female'
                      type="text"
                      pattern="[0-9]*"
                      onChange={onInputChange}
                      sx={{ width: 'auto' }}
                      startAdornment={
                        <InputAdornment position="start">
                          <HotelIcon color='primary' />
                        </InputAdornment>
                      }
                    />
                    <Input
                      placeholder='# Other'
                      name='other'
                      type="text"
                      pattern="[0-9]*"
                      onChange={onInputChange}
                      sx={{ width: 'auto' }}
                      startAdornment={
                        <InputAdornment position="start">
                          <HotelIcon color='primary' />
                        </InputAdornment>
                      }
                    />
                    <Input
                      placeholder="# Doesn't matter"
                      name='none'
                      type="text"
                      pattern="[0-9]*"
                      onChange={onInputChange}
                      sx={{ width: 'auto' }}
                      startAdornment={
                        <InputAdornment position="start">
                          <HotelIcon color='primary' />
                        </InputAdornment>
                      }
                    />

                  </Stack>
                  <Input
                    placeholder="Add extra comment on your requirements"
                    name='comment'
                    onChange={onInputChange}
                    sx={{ width: '50%' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <AnnouncementIcon color='primary' />
                      </InputAdornment>
                    }
                    multiline
                  />
                </>
                : null
            }
          </Stack>
          <Button
            to='/main/community'
            primary={1}
            onClick={onPublicPost}
            style={{ marginTop: '70px' }}
          >
            Public
          </Button>
        </Form>
      </Container>
    </ThemeProvider>
  )
}

export default CreatePost