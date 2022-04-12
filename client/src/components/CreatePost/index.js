import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ArticleIcon from '@mui/icons-material/Article';

import { theme } from '../MuiTheme'
import {
  Container,
  Form,
  HeaderWrapper,
  SearchLocWrapper,
  ToggleBtnWrapper,
} from "./styled"
import { Button } from '../Button.styled'

function CreatePost() {

  const mockLocations = [
    '1423 S New Hampshire Ave',
    '1424 S New Hampshire Ave',
    '1425 S New Hampshire Ave',
    '1426 S New Hampshire Ave',
    '1427 S New Hampshire Ave',
    '1428 S New Hampshire Ave',
  ]

  const [alignment, setAlignment] = useState('find roommate');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Form>
          <HeaderWrapper>
            <ArticleIcon fontSize='small' color='primary'/>
          <h1> Add a post.</h1>
          </HeaderWrapper>
          <ToggleBtnWrapper>
            <ToggleButtonGroup
              color="neutral"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton color="primary" value="find roommate">Find Roommate</ToggleButton>
              <ToggleButton color="primary" value="transfer">Transfer</ToggleButton>
            </ToggleButtonGroup>
          </ToggleBtnWrapper>
          <Stack spacing={7}
            alignItems='center'
            sx={{ width: '100%' }}>
            <Input
              placeholder='Press ENTER to search a location.'
              sx={{ width: '50%', textAlign: 'center' }}
              // id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <LocationOnIcon color='primary' />
                </InputAdornment>
              }
            />
            <List
              sx={{
                overflow: 'auto',
                maxHeight: 200,
                width: '50%',
              }}>
              {mockLocations.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <CheckIcon color='primary' />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'primary',
                      fontWeight: 'medium',
                      variant: 'body2',
                    }}
                    primary={item}
                  />
                </ListItem>
              ))}
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <AddCircleIcon color='primary' />
                  </IconButton>
                }
              >
                <ListItemText
                  primaryTypographyProps={{
                    color: 'white',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                  primary="Can't find an existing location? Add one"
                />
              </ListItem>
            </List>

            
            <Input
                placeholder="Say something about your house"
                sx={{ width: '50%'}}
                // id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HomeWorkIcon color='primary' />
                  </InputAdornment>
                }
                multiline
                // rows={4}
              />


            <Stack
              sx={{ width: '100%' }}
              spacing={6}
              direction='row'
              justifyContent='center'
              alignItems='center'>
              <Input
                placeholder='# Male Roommate'
                sx={{ width: 'auto'}}
                // id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HotelIcon color='primary' />
                  </InputAdornment>
                }
              />
              <Input
                placeholder='# Female Roommate'
                sx={{ width: 'auto'}}
                // id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HotelIcon color='primary' />
                  </InputAdornment>
                }
              />
              <Input
                placeholder="# Doesn't matter"
                sx={{ width: 'auto'}}
                // id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HotelIcon color='primary' />
                  </InputAdornment>
                }
              />
            </Stack>

            <Input
                placeholder="Add extra comment on your requirements"
                sx={{ width: '50%'}}
                // id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AnnouncementIcon color='primary' />
                  </InputAdornment>
                }
                multiline
                // rows={4}
              />
          </Stack>
          <Button 
          to='/main/community' 
          primary={1}
          style={{marginTop: '30px'}}
          >
            Public
          </Button>
        </Form>
      </Container>
    </ThemeProvider>
  )
}

export default CreatePost