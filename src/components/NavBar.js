import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from '@mui/material';





const NavBar = () => {
  const [value, setValue] = useState(0);

  return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={0} >
    <BottomNavigation
      showLabels
      width="xs"
      value={value}
      onChange={(e, newValue) => { setValue(newValue);}}
      sx={{bgcolor: 'primary.dark', height: 80, pb:1}}
    >

      <BottomNavigationAction  to="/" icon={<Badge badgeContent={5} color='warning'><HomeIcon sx={{bgcolor:'secondary.contrastText', width:50, height:40, p:1, borderRadius: 5}}/></Badge>} sx={{color: 'primary.dark'}}/>
      <BottomNavigationAction  to="/plants" icon={<SpaIcon />} sx={{color: 'secondary.main'}}/>
      <BottomNavigationAction  to="/search" icon={<SearchIcon />} sx={{color: 'secondary.main'}}/>
    </BottomNavigation>
  </Paper>);
}

export default NavBar;