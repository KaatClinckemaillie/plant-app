import { Box } from '@mui/system';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import BasicSpeedDial from '../components/BasicSpeedDial';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginButton = () => <a href={`${backendUrl}/api/connect/google`}>
    <button style={{ width: '150px' }}>Connect to google</button>
  </a>;

const LogoutButton = (props) => <button onClick={props.onClick}>Logout</button>;

const Layout = () => {
/*     const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  }; */

/*   const isLogged = useStore(state => state.isLoggedIn);
  const username = useStore(state => state.username);
  const logout = useStore(state => state.logout); */
  
  return (
  <Box sx={{ pb: 7 }}>
    <Outlet /> 
    <NavBar />  
  </Box >);
}

export default Layout;