import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '../Pagination';
import Grid from '@mui/material/Grid';

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
import { getHouseBySearch, updateHouseLikes, reset, sortHouseByPrice } from '../../features/houses/houseSlice';
import { getMe } from '../../features/auth/authSlice'
function Houses() {

  const { user } = useSelector((state) => (state.auth))
  const { data:{houses, totalPages, requestedAddr},
  isError, isSuccess, isLoading, message } = useSelector((state)=>(state.houses))
  const { search:{addr, distRange, priceRange, amenities} } = useSelector((state)=>(state.search))
  
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const onPageChange = (_, value) => {
    setPage(value)
  }
  // Watch page changes
  useEffect(()=>{
    if (isError) {
      toast.error(message)
    }
    dispatch(getHouseBySearch({
      addr,
      distRange,
      priceRange,
      amenities,
      page,
      limit: 10,
    }))
    dispatch(reset())
    
  }, [page])
  
  
  const [showDetail, setShowDetail] = useState(false);
  const [houseDetail, setHouseDetail] = useState();

  const toggleShowDetail = (house) => {
    setHouseDetail(house)
    setShowDetail((prev) => (!prev))
  }

  const handleLikeHouse = (house_id) => {
    dispatch(updateHouseLikes(house_id)).then(() => {
      dispatch(getMe())
    })
  }

  const sortByPrice = (asc) =>{
    dispatch(sortHouseByPrice({
      addr,
      distRange,
      priceRange,
      amenities,
      page,
      limit: 10,
      sortBy: "price",
      asc: asc
    }))
  }

  useEffect(() => {
    setHouseDetail((prev) => (
      prev ? houses.filter((house) => (house._id === prev._id))[0] : null
    ))
  }, [houses])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  return (
    <ThemeProvider theme={theme}>
      {showDetail ? 
      <HouseDetail
        toggleShowDetail={toggleShowDetail}
        houseDetail={houseDetail}
        handleLikeHouse={handleLikeHouse}
      /> : null}
      <Container showDetail={showDetail}>
        <LocationInfo>
          <LocationOnIcon
            color='primary'
            fontSize='small'
          />
          <p style={{fontSize: 'smaller'}}>
            {requestedAddr}
          </p>
        </LocationInfo>
        <FuncBtns>
          <Stack spacing={2} direction="row">
            <Button 
              variant="text" 
              size="small" 
              component={Link}
              to='/main/search'>Edit Loc</Button>
            <Button variant="text" 
              size="small" 
              component={Link}
              to='/main/filter'>Edit Filter</Button>
            <StyledSelect
              value={'Price'}
              label="Age"
              variant='outlined'
            // onChange={handleChange}
            >
              <MenuItem value={'Price Ascending'} onClick={()=>{sortByPrice(true)}}>$ ↑</MenuItem>
              <MenuItem value={'Price Descending'} onClick={()=>{sortByPrice(false)}}>$ ↓</MenuItem>
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
            {houses.map((house, index) => (
              <Grid
                item
                xs={2} sm={3} md={3}
                key={house._id}
              >
                <HouseCard
                  key={house._id}
                  house={house}
                  toggleShowDetail={() => toggleShowDetail(house)}
                />
              </Grid>
            ))}
          </Grid>
        </GridWrapper>
        <PageWrapper>
          <Pagination 
            page={page}
            count={totalPages}
            onPageChange={onPageChange}/>
        </PageWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default Houses