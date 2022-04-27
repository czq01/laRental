import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AppsIcon from '@mui/icons-material/Apps';
import Chip from '@mui/material/Chip';
import StarsIcon from '@mui/icons-material/Stars';
import HomeIcon from '@mui/icons-material/Home';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LinkIcon from '@mui/icons-material/Link';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { DetailWrapper } from './styled'

function HouseDetail({ handleLikeHouse, 
  houseDetail: {
    _id,
  } }) {
  const { user } = useSelector((state) => (state.auth))

  const { data: { houses } } = useSelector((state) => (state.houses))

  const thisHouse = houses.filter((house) => (_id == house._id))[0]

  const { price,
    location,
    dist,
    amenities,
    highlights,
    size,
    units,
    likes, 
    href,
  } = thisHouse

  const navigate = useNavigate()

  const onClickLike = () => {
    if (!user) {
      toast.error("Please Sign in first")
    } else {
      handleLikeHouse(_id)
    }
  }

  const onClickToPost = () =>{
    navigate('/main/post?'+ _id)
  }

  const onToSource = (href) => {
    const w = window.open('about:blank')
    w.location.href = href
  }

  return (
    <ThemeProvider theme={theme}>
        <DetailWrapper>
          
          <Stack direction="row" spacing={2} alignItems='center'>
            <GpsFixedIcon color='primary' />
            <p>{location.formattedAddr}</p>
            <p style={{ color: '#69f0ae' }}>
            {(dist < 1000) ? `${dist}m` : `${(dist / 1000).toFixed(1)}km`}
            </p>
          </Stack>

          <Stack direction="row" spacing={2} alignItems='center'>
            <AttachMoneyIcon color='primary' />
            <p>{price} / month</p>
          </Stack>

          <Stack direction="row" spacing={2} alignItems='center'>
            <HomeIcon color='primary' />
            <p>{size}</p>
            <LocalHotelIcon color='primary' />
            {units.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </Stack>

          <Stack direction="row"
            spacing={2}
            alignItems='center'
            flexWrap='wrap'

            rowGap='5px'
            
          >
            <AppsIcon color='primary' />
            {amenities.map((item, index) => (
              item !== '' ?
              <Chip
                key={index}
                label={item}
                variant="outlined"
                color='secondary'
              /> : null
            ))}
          </Stack>

          <Stack direction="row"
            spacing={2}
            alignItems='center'
            flexWrap='wrap'
            rowGap='5px'
          >
            <StarsIcon color='primary' />
            {highlights.map((item, index) => (
              <Chip
                key={index}
                label={item}
                variant="outlined"
                color='secondary'
              />
            ))}
          </Stack>

          <Stack direction="row"
            spacing={2}
            alignItems='center'
            justifyContent='space-between'
            width={"100%"}
          >
            <p style={{ fontSize: 'smaller' }}>
              {likes.length} people has liked this house.
            </p>
            <Stack direction="row" spacing={2} alignItems='center'>

              {!user || !user.houses.includes(_id) ?
                <Tooltip title="Like" placement="top">
                  <IconButton onClick={onClickLike}>
                    <BookmarkAddIcon color='primary' />
                  </IconButton>
                </Tooltip> :
                <Tooltip title="Unlike" placement="top">
                  <IconButton onClick={onClickLike}>
                    <BookmarkAddedIcon color='secondary' />
                  </IconButton>
                </Tooltip> 
              }

              <Tooltip title="More Info" placement="top">
                <IconButton onClick = {() => onToSource(href)}>
                  <LinkIcon color='primary' />
                </IconButton>
              </Tooltip>

              <Tooltip title="Add Post" placement="top">
                <IconButton onClick={onClickToPost}>
                  <PostAddIcon color='primary' />
                </IconButton>
              </Tooltip>

            </Stack>
          </Stack>

        </DetailWrapper>
    </ThemeProvider>
  )
}

export default HouseDetail