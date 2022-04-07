import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';



const NavBar = () => {
  const [value, setValue] = useState(0);

  return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,  }} elevation={0} >
    <BottomNavigation
      showLabels
      width="xs"
      value={value}
      onChange={(e, newValue) => { setValue(newValue);}}
      sx={{bgcolor: 'primary.contrast'}}
    >

      <BottomNavigationAction  to="/" icon={<HomeIcon />} />
      <BottomNavigationAction  to="/plants" icon={<SpaIcon />} />
      <BottomNavigationAction  to="/search" icon={<SearchIcon />} />
    </BottomNavigation>
  </Paper>);
}

export default NavBar;