import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material/styles';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ChatIcon from '@mui/icons-material/Chat';

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

function PostCard() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Requirement>
          1 Male | 2 Females
        </Requirement>
        <Distance>
          {"< 100m"}
        </Distance>
        <UserInfo>
          <AccountCircleIcon 
            fontSize='large'
            color='primary' />
          <UserName>
            <p>Luxunzhe Yao</p>
            <span>6h ago</span>
          </UserName>
        </UserInfo>
        <Type>
          <Chip label="Roommate Request" color="primary"/>
        </Type>
        <Comment>
          <p>
            Need College students only. 
            Need College students only. 
            Need College students only.
            Need College students only. 
            Need College students only. 
            Need College students only.
            Need College students only. 
            Need College students only. 
            Need College students only.
            Need College students only. 
            Need College students only. 
            Need College students only.
          </p>
        </Comment>
        <OperationWrapper>
        <Stack direction="row" spacing={1}>
          <BookmarkAddIcon color='primary'/>
          <Chip 
            icon={<ChatIcon />} 
            label="Chat with author" 
            color="primary" 
            size='small'
            variant="outlined"/>
          </Stack>
        </OperationWrapper>

      </Container>
    </ThemeProvider>
  )
}

export default PostCard