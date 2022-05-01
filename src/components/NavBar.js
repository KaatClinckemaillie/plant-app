import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {Link, useLocation} from 'react-router-dom'





const NavBar = () => {
  const { pathname } = useLocation();


  return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={0} >
    <BottomNavigation
      showLabels
      width="xs"
      value={pathname}
      sx={{bgcolor: 'primary.dark', height: 80, pb:1}}
    >

      <BottomNavigationAction component={Link} value="/"  to="/" icon={<HomeIcon />} sx={{color: 'secondary.main'}}/>
      <BottomNavigationAction component={Link} value="/plants"  to="/plants" icon={<SpaIcon />} sx={{color: 'secondary.main'}}/>
      <BottomNavigationAction component={Link} value="/search"  to="/search" icon={<SearchIcon />} sx={{color: 'secondary.main'}}/>
    </BottomNavigation>
  </Paper>);
}

export default NavBar;