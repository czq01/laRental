import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import houseService from '../../features/houses/houseService';
import HouseInfo from '../HouseInfo';
import { updateHouseLikes } from '../../features/houses/houseSlice'
import { getMe } from '../../features/auth/authSlice'
import NoData from '../NoData';
import Loading from '../Loading';

function MyHouses({ user: { houses } }) {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [myHouses, setMyHouses] = useState()

  useEffect(() => {

    // Definitions
    const fetchHouses = async (house_ids) => {
      try {
        const houses = (await houseService.getHousesByIds(house_ids)).houses
        setMyHouses(houses)
      } catch (error) {
        toast.error(error.message || error)
      }
    }

    // Calls
    fetchHouses(houses)
  }, [])

  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, message } = useSelector((state) => (state.houses))
  const onDislikeHouse = (_id) => {
    dispatch(updateHouseLikes(_id)).then(() => {
      dispatch(getMe())
    })
    setMyHouses((prev) => (
      prev.filter((house) => (house._id !== _id))
    ))
    setDialog(false)
  }
  useEffect(() => {

    if (isError) toast.error(message)

  }, [isSuccess, isError, isLoading, message])

  return (
    <ThemeProvider theme={theme}>
      <Stack
        spacing={2}
        sx={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start',
          padding: '30px 30px',
        }}
      >
        {myHouses ?
        myHouses.length === 0 ? 
        <NoData message={"You haven't liked anyhouse.."} /> :
        myHouses?.map((house, idx) => (
          <Accordion
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
            sx={{
              background: 'transparent',
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{house.location.formattedAddr.split(',')[0]}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: '20px' }}
            >
              <HouseInfo house={house} spacing={4} />
              <Stack
                direction='row'
                sx={{
                  width: '100%',
                  marginTop: '10px',
                  justifyContent: 'flex-end',
                }}
              >
                <Tooltip title="Dislike">
                  <IconButton >
                    <DeleteIcon color='secondary' onClick={handleOpenDialog}/>
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={dialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  BackdropProps={{
                    style: {
                      background: 'transparent',
                    }
                  }}
                >
                  <DialogTitle sx={{fontSize: '20px'}} color='primary'>
                    {"Dislike this house resource?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color='secondary'>cancel</Button>
                    <Button onClick={() => onDislikeHouse(house._id)} autoFocus variant='outlined'>
                      go
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>

            </AccordionDetails>
          </Accordion>
        )) : <Loading />}
      </Stack>
    </ThemeProvider>
  )
}

export default MyHouses