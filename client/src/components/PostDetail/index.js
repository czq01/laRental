import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ThemeProvider } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import NumbersIcon from '@mui/icons-material/Numbers';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import TransgenderIcon from '@mui/icons-material/Transgender';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import Tooltip from '@mui/material/Tooltip';
import ta from 'time-ago'

import { theme } from '../MuiTheme'
import { Container, HouseWrapper, ToggleBtnWrapper, PostWrapper, RequestWrapper, SendRequestWrapper, ProgressWrapper } from "./styled"
import requestService from '../../features/requests/requestService';
import RequestSender from '../RequestSender';
import RequestProgress from '../RequestProgress';
import {updatePost} from '../../features/posts/postSlice'
import HouseInfo from '../HouseInfo';

function PostDetail({ post, house }) {

  const { user } = useSelector((state) => (state.auth))
  const [alignment, setAlignment] = useState('post');

  const handleAlignChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  const { desc, requirements: { people, comment },
    createdAt, requestedBy } = post
  
  const [requests, setRequests] = useState([])
  useEffect(() => {

    const fetchRequest = async (request_id) => {
      const request = (await requestService.getRequestById(request_id)).request
      setRequests((prev) => ([...prev, request]))
    }

    // If there's request for this post, fetch them
    if (requestedBy?.length !== 0) {
      setRequests([])
      try {
        requestedBy.forEach((request_id) => {
          fetchRequest(request_id)
        })
      } catch (error) {
        toast.error(error.message)
      }
    }
  }, [])

  const dispatch = useDispatch()
  const onSendRequest = async (desc) => {
    const token = user.token
    const requestData = {
      post_id: post._id,
      desc,
    }
    try {
      const newRequest = (await requestService.createRequest(token, requestData)).request
      setRequests(prev => [...prev, newRequest])
      dispatch(updatePost({
        _id: newRequest._id,
        post: newRequest.post,
      }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ToggleBtnWrapper>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignChange}
          >
            <ToggleButton value="post" color="primary">Post</ToggleButton>
            <ToggleButton value="house" color="primary">House</ToggleButton>
            <ToggleButton value="request" color="primary">Send Request</ToggleButton>
          </ToggleButtonGroup>
        </ToggleBtnWrapper>
        {alignment === 'post' ?
          <PostWrapper>
            <Stack spacing={6}>

              <Stack direction="row" spacing={2} alignItems='center'>
                <CalendarMonthIcon color='primary' />
                <p>{ta.ago(createdAt)}</p>
              </Stack>

              <Stack direction="row" spacing={2} alignItems='top'>
                <DescriptionIcon color='primary' />
                <p>{desc}</p>
              </Stack>

              <Stack direction="row" spacing={2} alignItems='center'>
                <NumbersIcon color='primary' />
                <Stack direction="row" spacing={.5}>
                  {people?.map((person) => {
                    if (person === 'male') {
                      return (
                        <Tooltip title="Male">
                          <ManIcon fontSize='large' color='secondary' />
                        </Tooltip>
                      )
                    } else if (person === 'female') {
                      return (
                        <Tooltip title="Female">
                          <WomanIcon fontSize='large' color='secondary' />
                        </Tooltip>
                      )
                    } else if (person === 'other') {
                      return (
                        <Tooltip title="Other genders">
                          <TransgenderIcon fontSize='large' color='secondary' />
                        </Tooltip>
                      )
                    } else {
                      return (
                        <Tooltip title="Gender doesn't matter">
                          <PersonIcon fontSize='large' color='secondary' />
                        </Tooltip>
                      )
                    }
                  })}
                </Stack>
              </Stack>


              <Stack direction="row" spacing={2} alignItems='top'>
                <ReportIcon color='primary' />
                <p>{comment}</p>
              </Stack>

            </Stack>
          </PostWrapper>
          : alignment === 'house' ? <HouseWrapper>
            <HouseInfo house={house} spacing={8}/>
          </HouseWrapper> : 
          <RequestWrapper>
            <SendRequestWrapper>
              {requests.find(req => (req?.sender === user._id)) 
                ? <p>You have sent request for this post.</p>
                : <RequestSender onSendRequest={onSendRequest}/>
              }
            </SendRequestWrapper>
            <ProgressWrapper>
              <RequestProgress requests={requests} need={people.length}/>
            </ProgressWrapper>
          </RequestWrapper>
          }
      </Container>
    </ThemeProvider>
  )
}

export default PostDetail