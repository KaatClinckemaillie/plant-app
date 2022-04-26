import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GrassIcon from '@mui/icons-material/Grass';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link, useNavigate } from "react-router-dom";

const actions = [
  { icon: <GrassIcon />, name: 'Add Plant' },
  { icon: <HomeOutlinedIcon />, name: 'Add Location' },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <>
    {/* <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}> */}

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 72, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => navigate("/search")}
          />
        ))}
      </SpeedDial>
    {/* </Box> */}
   </>
  );
}