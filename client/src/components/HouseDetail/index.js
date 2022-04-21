import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
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
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { Container, DetailClose, DetailWrapper } from './styled'

function HouseDetail({ toggleShowDetail, handleLikeHouse,
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
  } = thisHouse

  const detailRef = useRef();
  const closeDetail = e => {
    if (detailRef.current === e.target) {
      toggleShowDetail();
    }
  }

  const onClickLike = () => {
    if (!user) {
      toast.error("Please Sign in first")
    } else {
      handleLikeHouse(_id)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={closeDetail} ref={detailRef}>
        <DetailWrapper>
          <DetailClose onClick={toggleShowDetail} />
          
          <Stack direction="row" spacing={2} alignItems='center'>
            <GpsFixedIcon color='primary' />
            <p>{location.formattedAddr}</p>
            <p style={{ color: '#69f0ae' }}>
            {(dist < 1000) ? `${dist}m` : `${dist / 1000}km`}
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
          >
            <AppsIcon color='primary' />
            {amenities.map((item, index) => (
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
            flexWrap='wrap'
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
                <IconButton>
                  <LinkIcon color='primary' />
                </IconButton>
              </Tooltip>

            </Stack>
          </Stack>

        </DetailWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default HouseDetail