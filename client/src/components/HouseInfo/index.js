import React from 'react'
import Stack from '@mui/material/Stack';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import Chip from '@mui/material/Chip';
import StarsIcon from '@mui/icons-material/Stars';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'

function HouseInfo({ house, spacing }) {
  const { location, price, size, units, amenities, highlights } = house
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={spacing}>
        <Stack direction="row" spacing={2} alignItems='center'>
          <GpsFixedIcon color='primary' />
          <p>{location?.formattedAddr}</p>

        </Stack>

        <Stack direction="row" spacing={2} alignItems='center'>
          <AttachMoneyIcon color='primary' />
          <p>{price} / month</p>
        </Stack>

        <Stack direction="row" spacing={2} alignItems='center'>
          <HomeIcon color='primary' />
          <p>{size}</p>
          <LocalHotelIcon color='primary' />
          {units?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Stack>

        <Stack direction="row"
          spacing={2}
          alignItems='center'
          flexWrap='wrap'
        >
          <AppsIcon color='primary' />
          {amenities?.map((item, index) => (
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
          {highlights?.map((item, index) => (
            <Chip
              key={index}
              label={item}
              variant="outlined"
              color='secondary'
            />
          ))}
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}

export default HouseInfo