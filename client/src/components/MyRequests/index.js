import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ta from 'time-ago'


import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import requestService from '../../features/requests/requestService';
import NoData from '../NoData';
import Loading from '../Loading';

function MyRequests() {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [myRequests, setMyRequests] = useState()

  const { user: { token } } = useSelector((state) => (state.auth))
  useEffect(() => {

    // Definitions
    const fetchRequests = async () => {
      try {
        const requests = (await requestService.getMyRequests(token)).requests
        setMyRequests(requests.filter(req => req.deleted === false))
      } catch (error) {
        toast.error(error.message || error)
      }
    }

    // Calls
    fetchRequests()
  }, [])

  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const onDeleteRequest = async (request_id) => {
    try {
      const del_req_id = (await requestService.deleteRequest(token, request_id)).data
      setMyRequests(prev => prev.filter((req => req._id !== del_req_id)))
      setDialog(false)
    } catch (error) {
      toast.error(error.message || error)      
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Stack
        spacing={2}
        sx={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '50px 30px',
        }}
      >
        {myRequests?
        myRequests.length === 0 ?
        <NoData message={"You haven't sent any request..."} /> :
        myRequests.map((req, idx) => (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
            sx={{
              background: 'transparent',
              width: '100%',
            }}
            key={req._id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Stack direction='row' spacing={3} alignItems='center'>
                <Typography>{
                  req.post.house.location.formattedAddr?.split(',')[0]
                }</Typography>
                <Typography sx={{ color: '#d3d3d3', fontSize: '10px' }}>{
                  `${ta.ago(req.createdAt)}`
                }</Typography>
                {req.status === 'undecided' ?
                  <Chip label="IN PROGRESS..." variant="outlined" color='secondary' /> :
                  req.status === 'accepted' ?
                    <Chip label="ACCEPTED" variant="outlined" color='primary' /> :
                    <Chip label="REJECTED" variant="outlined" color='secondary' />}
              </Stack>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: '20px' }}>
              <Stack spacing={4}>
                <p style={{ fontSize: 'small' }}>
                  {req.desc}
                </p>
                <Stack direction='row' justifyContent='flex-end'>
                  <Tooltip title="Withdraw This Request" placement='top'>
                    <IconButton onClick={handleOpenDialog}>
                      <BackspaceIcon color='secondary' />
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
                    <DialogTitle sx={{ fontSize: '20px' }} color='primary'>
                      {"Withdraw this request?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color='secondary'>
                        It may take time for the author to take care of all requests.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color='secondary'>cancel</Button>
                      <Button autoFocus variant='outlined' 
                        onClick={async () => await onDeleteRequest(req._id)}>
                        go
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        )) : <Loading />}
      </Stack>
    </ThemeProvider>
  )
}

export default MyRequests