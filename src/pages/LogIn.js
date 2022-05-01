import React, { useState } from 'react';
import { Button, Box, Typography} from '@mui/material';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const LogIn = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

                

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;
  if (isLogged) {
    buttons = <Button variant="outlined" onClick={logout}  size="medium" color="primary" aria-label="log out" sx={{width:200, mt:5,}}> Logout </Button>
  } else {
      buttons = <Button variant="contained" component={'a'} href={`${backendUrl}/api/connect/google`}  size="medium" color="primary" aria-label="log in" sx={{width:200, mt:5}}> Log in with google </Button>
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return (
    <Box sx={{bgcolor:'primary.light', width: '100vw', height:'100vh'}} alignItems={'center'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
      <Typography fontSize={20} textAlign={'center'} sx={{color:'primary.main', marginTop:'-5rem'}}>
        {text}
      </Typography>
        {buttons}
    </Box>
  )
}

export default LogIn;
