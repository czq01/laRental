import { useState } from 'react'
import Stack from '@mui/material/Stack';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import {
  AmenitiesFilter,
  AmenitiesInput,
  Chips,
  Container,
  Filter,
  HeaderWrapper,
  PriceSlider,
  ListItem,
  BtnWrapper,
} from './styled'
import { Button } from '../Button.styled'


function SearchFilter() {

  // Price related state
  const [price, setPrice] = useState([1000, 3000]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  // Amenities related state
  const [chips, setChips] = useState(['Air Condition'])

  const handleDelete = (indexToRemove) => {
    setChips([...chips.filter((_, index) => index !== indexToRemove)]);
  };

  const addChips = event => {
    if (event.target.value !== "") {
      setChips([...chips, event.target.value]);
      event.target.value = "";
    }
  };

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
        <Filter>
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
              getAriaLabel={() => 'Temperature range'}
              value={price}
              onChange={handleChange}
              valueLabelDisplay="auto"
              step={500}
              marks
              min={500}
              max={8000}
            // getAriaValueText={valuetext}
            />
            <AttachMoneyOutlinedIcon
              color='primary'
              fontSize='large'
            />
          </Stack>

        </Filter>
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