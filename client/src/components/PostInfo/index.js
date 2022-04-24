import { ThemeProvider } from '@mui/material/styles';
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

function PostInfo({ post, spacing }) {

  const { desc, requirements: { people, comment },
    createdAt, requestedBy } = post
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={spacing}>

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
            {people?.map((person, idx) => {
              if (person === 'male') {
                return (
                  <Tooltip title="Male" key={idx}>
                    <ManIcon fontSize='large' color='secondary' />
                  </Tooltip>
                )
              } else if (person === 'female') {
                return (
                  <Tooltip title="Female" key={idx}>
                    <WomanIcon fontSize='large' color='secondary' />
                  </Tooltip>
                )
              } else if (person === 'other') {
                return (
                  <Tooltip title="Other genders" key={idx}>
                    <TransgenderIcon fontSize='large' color='secondary' />
                  </Tooltip>
                )
              } else {
                return (
                  <Tooltip title="Gender doesn't matter" key={idx}>
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
    </ThemeProvider>
  )
}

export default PostInfo