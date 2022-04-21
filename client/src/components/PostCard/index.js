import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material/styles';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ChatIcon from '@mui/icons-material/Chat';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import TransgenderIcon from '@mui/icons-material/Transgender';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

import ta from 'time-ago'

import {
  // Avatar, 
  Container,
  Distance,
  OperationWrapper,
  Requirement,
  Type,
  UserInfo,
  UserName,
  Comment,
} from "./styled"
import { theme } from '../MuiTheme'
import authService from '../../features/auth/authService'

function stringAvatar(name) {
  if (!name) return // in case getUserById not ready
  return {
    sx: {
      bgcolor: '#69f0ae',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function PostCard({ onOpenModal, post }) {
  
  const {
    type,
    createdBy,
    updatedAt,
    dist,
    requirements: {
      people,
      comment
    }
  } = post

  const [author, setAuthor] = useState('')
  const [people_display, setPeople_display] = useState('')
  useEffect(() => {

    // declare async function for getting user by id
    const fetchAuthor = async () => {
      const author = (await authService.getUserById(createdBy)).user
      setAuthor(author)
    }

    try {
      // call the function here
      fetchAuthor()
    } catch (error) {
      toast.error(error.message)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Requirement>
          <Stack direction="row" spacing={.5}>
            {people.map((person) => {
              if (person === 'male') {
                return (
                  <Tooltip title="Male">
                    <ManIcon fontSize='large' />
                  </Tooltip>
                )
              } else if (person === 'female') {
                return (
                  <Tooltip title="Female">
                    <WomanIcon fontSize='large' />
                  </Tooltip>
                )
              } else if (person === 'other') {
                return (
                  <Tooltip title="Other genders">
                    <TransgenderIcon fontSize='large' />
                  </Tooltip>
                )
              } else {
                return (
                  <Tooltip title="Gender doesn't matter">
                    <PersonIcon fontSize='large' />
                  </Tooltip>
                )
              }
            })}
          </Stack>
        </Requirement>
        <Distance>
          {(dist < 1000) ? `${dist}m` : `${dist / 1000}km`}
        </Distance>
        <UserInfo>
          <Avatar
            fontSize='small'
            onClick={onOpenModal}
            {...stringAvatar(author.name)}
          />
          <UserName>
            <p>{author.name}</p>
            <span>{ta.ago(updatedAt)}</span>
          </UserName>
        </UserInfo>
        <Type>
          <Chip label={type} color="primary" variant='outlined' />
        </Type>
        <Comment>
          <p>
            {comment}
          </p>
        </Comment>
        <OperationWrapper>
          <Stack direction="row" spacing={1}>
            <Tooltip title="More Info">
              <IconButton onClick={async () => {await onOpenModal(post)}}>
                <MoreHorizIcon color='primary' fontSize='large' />
              </IconButton>
            </Tooltip>
          </Stack>
        </OperationWrapper>

      </Container>
    </ThemeProvider>
  )
}

export default PostCard