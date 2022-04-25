import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import HouseIcon from '@mui/icons-material/House';
import InputAdornment from '@mui/material/InputAdornment';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import TextField from '@mui/material/TextField';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { theme } from '../MuiTheme'
import { Container, ChipsInput, Chips, ChipsWrapper, ChipItem } from './styled';
import { color } from '@mui/system';
import { toast } from 'react-toastify';

import houseService from '../../features/houses/houseService';

function AddHouse({onNewHouseAdded}) {

  const [formData, setFormData] = useState({
    address: '',
    price: '',
    bed: 0,
    bath: 0,
    link: '',
  })

  const { address, price, bed, bath, link} = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [chips, setChips] = useState(['Pets Allowed'])

  const handleDelete = (indexToRemove) => {
    setChips([...chips.filter((_, index) => index !== indexToRemove)]);
  };

  const addChips = event => {
    if (event.target.value !== "") {
      setChips([...chips, event.target.value]);
      event.target.value = "";
    }
  };

  const onAddHouse = async () => {
    if (!address) toast.error("Address can't be empty.")
    else if (!price) toast.error("Rental Price can't be empty.")
    else {
      try {
        const houseData = {
          address,
          price: Number.parseInt(price),
        }
        if (bed && bath) {
          houseData.units = [`${bed} bedrooms`, `${bath} bathrooms`]
        }
        if (chips.length !== 0) {
          houseData.highlights = chips
        }
        if (link) houseData.href = link
        const house = (await houseService.addHouse(houseData)).house
        onNewHouseAdded(house)
      } catch (error) {
        toast.error(error.message || error)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack spacing={7} sx={{ width: '70%' }}>
          <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
            <HouseIcon color='primary' />
            <h1 style={{ fontWeight: 'bold', fontSize: '45px', color: 'white' }}>
              Add a house.
            </h1>
          </Stack>

          <TextField
            name='address'
            onChange={onChange}
            helperText="Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GpsFixedIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <TextField
            name='price'
            onChange={onChange}
            helperText="Rental Price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon color='primary' />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  / month
                </InputAdornment>
              )
            }}
            variant="standard"
          />

          <Stack direction='row' spacing={5} alignItems='center' justifyContent='start'>
            <TextField
              name='bed'
              onChange={onChange}
              helperText="Number of Bedrooms"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BedIcon color='primary' />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              name='bath'
              onChange={onChange}
              helperText="Number of Bathrooms"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BathtubTwoToneIcon color='primary' />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Stack>

          <ChipsWrapper>
            <Chips>
              {chips.map((chip, idx) => (
                <ChipItem>
                  <Chip label={chip}
                    onDelete={() => handleDelete(idx)}
                    color='primary'
                    variant='outlined'
                  />
                </ChipItem>
              ))}
            </Chips>
            <ChipsInput
              onKeyUp={event => event.key === 'Enter' ? addChips(event) : null}
              placeholder='Press ENTER to add highlights.'
            />
          </ChipsWrapper>

          <TextField
            name='link'
            onChange={onChange}
            helperText="Link (i.e. link to the detailed house description in agent website.)"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Button
              onClick={onAddHouse}
              variant="contained"
              endIcon={<AddCircleOutlineTwoToneIcon />}>
              add
            </Button>
          </Stack>

        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default AddHouse