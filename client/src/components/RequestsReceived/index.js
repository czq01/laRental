import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';



import ta from 'time-ago'

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import requestService from '../../features/requests/requestService';
import RequestProgress from '../RequestProgress';
import RequestUserDetail from '../RequestUserDetail';

function RequestsReceived({ requestedBy, need }) {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [requests, setRequests] = useState([])

  const [openModal, setOpenModal] = useState(false);
  const [senderNow, setSenderNow] = useState(0);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (idx) =>{
    setOpenModal(true);
    setSenderNow(idx);
  } ;


  useEffect(() => {

    // Definitions
    const fetchPosts = async (request_ids) => {
      try {
        const requests = (await requestService.getRequestsByIds(request_ids)).requests
        setRequests(requests)
      } catch (error) {
        toast.error(error.message || error)
      }
    }

    // Calls
    fetchPosts(requestedBy)
  }, [])


  const { user: { token } } = useSelector((state) => (state.auth))
  const onHandleRequest = async (request_id, status) => {
    try {
      const newRequest = (await requestService.handleRequest(token, { request_id, status })).data
      setRequests(prev => (
        prev.map((req) => {
          if (newRequest?._id === req._id) {
            const sender = req.sender
            newRequest.sender = sender
            return newRequest
          } else return req
        }
        )))
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
          padding: '0 30px',
        }}
      >
        
        {requests?.map((request, idx) => (
          <Accordion
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
            sx={{
              background: 'transparent',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Stack direction='row' spacing={3} alignItems='center'>
                <Typography>{
                  `${request.sender.name}`
                }</Typography>
                <Typography sx={{ color: '#d3d3d3', fontSize: '10px' }}>{
                  `${ta.ago(request.createdAt)}`
                }</Typography>
              </Stack>

            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: '10px' }}>
              <Stack spacing={2} sx={{ padding: '10px 10px' }}>
                {<span style={{ fontSize: 'small' }}>{request.desc}</span>}
                <Stack direction='row' justifyContent='flex-end'>
                  {request.status === 'undecided' ?
                    <>
                      {senderNow == idx ?
                      <Modal
                          open={openModal}
                          onClose={handleCloseModal}
                          BackdropProps={{
                            style: {
                              backdropFilter: 'blur(10px)'
                            }
                          }}
                          >                
                          <RequestUserDetail sender={request.sender}/>
                        </Modal> : null}
                      <Tooltip title="User Info" placement='top'>
                        <IconButton
                          >
                          <AssignmentIndIcon onClick={()=>handleOpenModal(idx)} color='primary' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Accept" placement='top'>
                        <IconButton
                          onClick={async () => await onHandleRequest(request._id, 'accepted')}>
                          <CheckIcon color='primary' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject" placement='top'>
                        <IconButton
                          onClick={async () => await onHandleRequest(request._id, 'rejected')}>
                          <CloseIcon color='secondary' />
                        </IconButton>
                      </Tooltip>
                    </> :
                    request.status === 'accepted' ?
                      <Chip label="ACCEPTED" variant="outlined" color='primary' /> :
                      <Chip label="REJECTED" variant="outlined" color='secondary' />
                  }
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      <Stack alignItems='center' sx={{ marginTop: '100px' }}>
        <div style={{ height: '50px' }}></div>
        <RequestProgress need={need} requests={requests} />
      </Stack>
    </ThemeProvider>
  )
}

export default RequestsReceived