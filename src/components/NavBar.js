import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

const NavBar = () => {
  return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
      showLabels
      width="xs"
    >
      <BottomNavigationAction label="Home" to="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Plants" to="/plants" icon={<SpaIcon />} />
      <BottomNavigationAction label="Search" to="/search" icon={<SearchIcon />} />
    </BottomNavigation>
  </Paper>);
}

export default NavBar;