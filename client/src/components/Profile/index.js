import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../MuiTheme'
import { Container } from './styled';
function Profile({ rawUser }) {
  const user = {
    ...rawUser,
    gender: rawUser.gender || '',
    age: rawUser.age || '',
    occupation: rawUser.occupation || '',
    desc: rawUser.desc || '',
  }
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    occupation: user.occupation,
    desc: user.desc,
  })

  const { name, email, age, gender, occupation, desc } = profileData;

  const onChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [modified, setModified] = useState(false)
  useEffect(() => {


    if (!(user.name === name &&
      user.email === email &&
      user.age === age &&
      user.gender === gender &&
      user.occupation === occupation &&
      user.desc === desc)) {
        console.log(profileData)
        console.log(user)
        setModified(true)
      } else {
        setModified(false)
      }
  }, [profileData])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack spacing={10} sx={{ width: '60%' }}>
          <TextField
            label="Name"
            name="name"
            defaultValue={name}
            variant="standard"
            onChange={onChange}
          />
          <TextField
            disabled
            label="Email"
            defaultValue={email}
            variant="standard"
          />
          <TextField
            label="Age"
            name="age"
            defaultValue={age}
            variant="standard"
            onChange={onChange}
          />
          <TextField
            label="Gender"
            name="gender"
            defaultValue={gender}
            variant="standard"
            onChange={onChange}
          />
          <TextField
            label="Occupation"
            name="occupation"
            defaultValue={occupation}
            variant="standard"
            onChange={onChange}
          />
          <TextField
            label="Description"
            name="desc"
            defaultValue={desc}
            multiline
            rows={4}
            variant="standard"
            onChange={onChange}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="outlined" disabled={!modified}>save</Button>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default Profile