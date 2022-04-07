import { Box } from '@mui/system';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
  <Box sx={{ pb: 7 }}>
    <Outlet />
    <NavBar />
  </Box >);
}

export default Layout;