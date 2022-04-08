import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '../Pagination';
import { theme } from '../MuiTheme'
import {
  Container,
  FuncBtns,
  LocationInfo,
  PageWrapper,
  StyledSelect,
} from './styled'

function Houses() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LocationInfo>
          <LocationOnIcon
            color='primary'
            fontSize='small'
          />
          <p>
            University of Southern California
          </p>
        </LocationInfo>
        <FuncBtns>
          <Stack spacing={2} direction="row">
            <Button variant="text" size="small">Edit Loc</Button>
            <Button variant="text" size="small">Edit Filter</Button>
            <StyledSelect
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={'Price'}
              label="Age"
              variant='outlined'
       
              // onChange={handleChange}
            >
              <MenuItem value={'Price'}>$</MenuItem>
              <MenuItem value={'Distance'}>km</MenuItem>
            </StyledSelect>
          </Stack>
        </FuncBtns>
        <PageWrapper>
        <Pagination />
        </PageWrapper>
      </Container>
    </ThemeProvider>
  )
}

export default Houses