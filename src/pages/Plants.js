import { Typography, AppBar, Tabs, Tab, Box, List, Stack } from '@mui/material';
import * as React from 'react';
import TabPanel from '../components/TabPanel';
import LabelMyPlants from '../components/LabelMyPlants';
import LocationMyPlants from '../components/LocationMyPlants';
import PlantMyPlants from '../components/PlantMyPlants';
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,   
  }
}



const Plants = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return(
    <>
      <Box m={'1rem'} >
        <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
          <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
            My plants
          </Typography>
          <Box sx={{ borderBottom: 3, borderColor: 'text.light' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tab my plants" variant="fullWidth" >
              <Tab label={LabelMyPlants(5, 'locations')} {...a11yProps(0)}/>
              <Tab label={LabelMyPlants(5, 'Plants')} {...a11yProps(1)}/>
              <Tab label={LabelMyPlants(5, 'Pictures')} {...a11yProps(2)}/>
            </Tabs>
          </Box>
        </AppBar>

          <TabPanel value={value} index={0} >
              <Stack spacing={2} direction="column" >
                <LocationMyPlants />
                <LocationMyPlants />
                <LocationMyPlants />
              </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <PlantMyPlants />
              <PlantMyPlants />
              <PlantMyPlants />
            </List> 
            planten
          </TabPanel>
          <TabPanel value={value} index={2}>
            foto's
        </TabPanel>
      </Box>

    </>
  )
}

export default Plants;