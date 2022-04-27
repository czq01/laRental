import { useState, useEffect, useRef } from 'react'
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
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

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
import Loading from '../Loading';
import NoData from '../NoData';
function Houses() {

  useEffect(() => {
    dispatch(getMe())
  }, [])

  const { user } = useSelector((state) => (state.auth))
  const { search: { addr, distRange, priceRange, amenities } } = useSelector((state) => (state.search))

  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const onPageChange = (_, value) => {
    setPage(value)
  }
  // Watch page changes
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSorting) {
      dispatch(sortHouseByPrice({
        addr,
        distRange,
        priceRange,
        amenities,
        page,
        limit: 10,
        sortBy: "price",
        asc: sortingAsc
      }))
    } else {
      dispatch(getHouseBySearch({
        addr,
        distRange,
        priceRange,
        amenities,
        page,
        limit: 10,
      }))
    }
    dispatch(reset())

  }, [page])

  const { data: { houses, totalPages, requestedAddr },
    isError, isSuccess, isLoading, message } = useSelector((state) => (state.houses))
  const [isSorting, setIsSorting] = useState(false);
  const [sortingAsc, setSortingAsc] = useState(false);
  const [houseDetail, setHouseDetail] = useState();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (house) => {
    setHouseDetail(house)
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false);

  const handleLikeHouse = (house_id) => {
    dispatch(updateHouseLikes(house_id)).then(() => {
      dispatch(getMe())
    })
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openModal]);

  const handleSort = () => {
    setIsSorting(false)
    dispatch(getHouseBySearch({
      addr,
      distRange,
      priceRange,
      amenities,
      page,
      limit: 10,
    }))
  }
  const sortByPrice = (asc) => {
    setIsSorting(true);
    setSortingAsc(asc);
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
      <Container>
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          BackdropProps={{
            style: {
              backdropFilter: 'blur(10px)',
            },
          }}
          maxWidth={false}
          PaperProps={{
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minHeight: '600px',
              width: '800px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              rowGap: '10px',
              aligItems: 'center',
              padding: '50px 50px',
            }
          }}
          scroll='body'      
        >

          <HouseDetail
            houseDetail={houseDetail}
            handleLikeHouse={handleLikeHouse}
          />
        </Dialog>
        <LocationInfo>
          <LocationOnIcon
            color='primary'
            fontSize='small'
          />
          <p style={{ fontSize: 'smaller' }}>
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
              <MenuItem value={'Price Ascending'} onClick={() => { sortByPrice(true) }}>$ ↑</MenuItem>
              <MenuItem value={'Price Descending'} onClick={() => { sortByPrice(false) }}>$ ↓</MenuItem>
              <MenuItem value={'Price Descending'} onClick={handleSort}>Distance ↑</MenuItem>
            </StyledSelect>
          </Stack>
        </FuncBtns>
        <GridWrapper>
          {isLoading ? <Loading /> :
            <Grid
              container
              spacing={{ xs: 1, md: 4 }}
              columns={{ xs: 4, sm: 9, md: 12 }}
              justifyContent='flex-start'
              alignItems='center'>
              {houses.length === 0 ?
                <NoData
                  message={"Ops, No house resources found near this location, try set a larger distance range..."}
                /> :
                houses.map((house) => (
                  <Grid
                    item
                    xs={2} sm={3} md={3}
                    key={house._id}
                  >
                    <HouseCard
                      key={house._id}
                      house={house}
                      handleOpenModal={() => handleOpenModal(house)}
                    />
                  </Grid>
                ))}
            </Grid>}
        </GridWrapper>
        <PageWrapper>
          <Pagination
            page={page}
            count={totalPages}
            onPageChange={onPageChange} />
        </PageWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default Houses