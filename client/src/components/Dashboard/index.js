import { useState } from 'react'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { Container, ItemContainer, TabContainer } from './styled';
import Profile from '../Profile';
import MyHouses from '../MyHouses';
import MyPosts from '../MyPosts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <TabContainer>
          {children}
        </TabContainer>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Dashboard() {

  const { user } = useSelector((state) => (state.auth))

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: 'calc(100vh - 80px)',
            overflow: 'auto',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          // sx={{ borderRight: 1, borderColor: 'divider', }}
          >
            <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="My Liked Houses" {...a11yProps(1)} />
            <Tab label="My Posts" {...a11yProps(2)} />
            <Tab label="My Requests" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ItemContainer>
              <Profile rawUser={user} />
            </ItemContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ItemContainer>
              <MyHouses user={user} />
            </ItemContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ItemContainer>
              <MyPosts user={user} />
            </ItemContainer>

          </TabPanel>
          <TabPanel value={value} index={3}>
            My Requests
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Dashboard