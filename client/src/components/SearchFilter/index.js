import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Stack from '@mui/material/Stack';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { ThemeProvider } from '@mui/material/styles';

import { updateSearch } from '../../features/search/searchSlice';
import { getHouseBySearch } from '../../features/houses/houseSlice';
import { theme } from '../MuiTheme'
import {
  AmenitiesFilter,
  AmenitiesInput,
  Chips,
  Container,
  HeaderWrapper,
  PriceSlider,
  ListItem,
  BtnWrapper,
} from './styled'
import { Button } from '../Button.styled'


function SearchFilter() {

  const { search: {addr, priceRange, distRange, amenities} } = useSelector((state)=>state.search)
  // Price related state
  const [inputPrice, setInputPrice] = useState(priceRange ? priceRange : [1000, 3000]);

  const handlePriceChange = (event, newValue) => {
    setInputPrice(newValue);
  };

  // Distance related state
  const [inputDist, setInputDist] = useState(distRange ? distRange : (0.5));

  const handleDistChange = (event, newValue) => {
    setInputDist(newValue);
  };

  // Amenities related state
  const [chips, setChips] = useState(amenities ? amenities : (['Air Conditioning']))

  const handleDelete = (indexToRemove) => {
    setChips([...chips.filter((_, index) => index !== indexToRemove)]);
  };

  const addChips = event => {
    if (event.target.value !== "") {
      setChips([...chips, event.target.value]);
      event.target.value = "";
    }
  };

  const dispatch = useDispatch()
  const onUpdateSearch = () => {
      const searchParams = {
        'priceRange': inputPrice,
        'distRange': inputDist,
        'amenities': chips,
      }
      dispatch(updateSearch(searchParams))

      dispatch(getHouseBySearch({addr, ...searchParams}))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderWrapper>
          <FilterListIcon
            color='primary'
            fontSize='large'
          />
          <h1>
            Add filter.
          </h1>
        </HeaderWrapper>

        <Stack
          spacing={6}
          alignItems='center'
          justifyContent={'center'}
          sx={{ mb: 1, width: '100%' }}
          gridRow={2}
          gridColumn={2}>


          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, width: '70%' }}
            alignItems="center">
            <DirectionsWalkIcon
              color='primary'
              fontSize='small'
            />
            <PriceSlider
              value={inputDist}
              onChange={handleDistChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0.5}
              max={10}
            />
            <DirectionsCarIcon
              color='primary'
              fontSize='large'
            />
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, width: '70%' }}
            alignItems="center">
            <AttachMoneyOutlinedIcon
              color='primary'
              fontSize='small'
            />
            <PriceSlider
              value={inputPrice}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              step={500}
              marks
              min={500}
              max={8000}
            />
            <AttachMoneyOutlinedIcon
              color='primary'
              fontSize='large'
            />
          </Stack>
        </Stack>


        <AmenitiesFilter>
          <Chips>
            {chips.map((chip, idx) => (
              <ListItem>
                <Chip label={chip}
                  onDelete={() => handleDelete(idx)}
                  color='primary'
                />
              </ListItem>
            ))}
          </Chips>
          <AmenitiesInput
            onKeyUp={event => event.key === 'Enter' ? addChips(event) : null}
            placeholder='Press ENTER to add tags'
          />
        </AmenitiesFilter>
        <BtnWrapper>
          <Button
            to={'../houses'}
            onClick={onUpdateSearch}
            primary={1}
          >
            Go
          </Button>
        </BtnWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default SearchFilter