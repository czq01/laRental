import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ta from 'time-ago'


import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import postService from '../../features/posts/postService'
import PostInfo from '../PostInfo';
import RequestsReceived from '../RequestsReceived';
import NoData from '../NoData';
import Loading from '../Loading';

function MyPosts({ user: { posts } }) {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [myPosts, setMyPosts] = useState()

  useEffect(() => {

    // Definitions
    const fetchPosts = async (post_ids) => {
      try {
        const posts = (await postService.getPostsByIds(post_ids)).posts
        setMyPosts(posts)
      } catch (error) {
        toast.error(error.message || error)
      }
    }

    // Calls
    fetchPosts(posts)
  }, [])

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
        {myPosts ?
          myPosts.length === 0 ?
            <NoData message={"You haven't published any posts..."} /> :
            myPosts.map((post, idx) => (
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
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
                  <Stack direction='row' spacing={3} alignItems='center'>
                    <Typography>{
                      `${post.type === 'roommate' ? 'Find Roommates' : 'Transfer'} `
                    }</Typography>
                    <Typography sx={{ color: '#d3d3d3', fontSize: '10px' }}>{
                      `${ta.ago(post.createdAt)}`
                    }</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ padding: '20px' }}>
                  <Stack spacing={4}>
                    <PostInfo post={post} spacing={4} />
                    <Divider />
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <MailOutlineIcon color='primary' />
                      <span> Reqeusts Received: </span>
                    </Stack>
                    <RequestsReceived requestedBy={post.requestedBy} need={post.requirements.people?.length} />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )) : <Loading />}
      </Stack>
    </ThemeProvider>
  )
}

export default MyPosts