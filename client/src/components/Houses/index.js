import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '../Pagination';
import Grid from '@mui/material/Grid';
import { useState } from 'react'

import { theme } from '../MuiTheme'
import {
  Container,
  FuncBtns,
  GridWrapper,
  LocationInfo,
  PageWrapper,
  StyledSelect,
} from './styled'
import HouseDetail from '../HouseDetail';
import HouseCard from '../HouseCard';

const mock_houses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Houses() {

  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  return (
    <ThemeProvider theme={theme}>
      <HouseDetail
        toggleShowDetail={toggleShowDetail}
        showDetail={showDetail}
      />
      <Container showDetail={showDetail}>
        <LocationInfo>
          <LocationOnIcon
            color='primary'
            fontSize='small'
          />
          <p>
            University of Southern California
          </p>
        </LocationInfo>
        <FuncBtns>
          <Stack spacing={2} direction="row">
            <Button variant="text" size="small">Edit Loc</Button>
            <Button variant="text" size="small">Edit Filter</Button>
            <StyledSelect

              value={'Price'}
              label="Age"
              variant='outlined'
            // onChange={handleChange}
            >
              <MenuItem value={'Price'}>$</MenuItem>
              <MenuItem value={'Distance'}>km</MenuItem>
            </StyledSelect>
          </Stack>
        </FuncBtns>
        <GridWrapper>
          <Grid
            container
            spacing={{ xs: 1, md: 4 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
            justifyContent='flex-start'
            alignItems='center'>
            {mock_houses.map((item, index) => (
              <Grid
                item
                xs={2} sm={3} md={3}
                key={index}
              >
                <HouseCard
                  toggleShowDetail={toggleShowDetail}
                />
              </Grid>
            ))}
          </Grid>
        </GridWrapper>
        <PageWrapper>
          <Pagination />
        </PageWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default Houses