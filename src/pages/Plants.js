import { Typography, AppBar, Tabs, Tab, Box, List, Stack } from '@mui/material';
import * as React from 'react';
import TabPanel from '../components/TabPanel';
import LabelMyPlants from '../components/LabelMyPlants';
import LocationMyPlants from '../components/LocationMyPlants';
import PlantMyPlants from '../components/PlantMyPlants';
import { useQuery } from 'react-query';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,   
  }
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plants = () => {
  const [value, setValue] = React.useState(0);


  const { isLoading, error, data: locations } = useQuery("locations", async () => {
    const data = await fetch(`${backendUrl}/api/locations?populate=*`).then(r => r.json());
    return data;
  });

  const {data: plants} = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?populate=*`).then(r => r.json());
    return data;
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  if(locations && plants){
    console.log('true')
  }else{
    console.log('false')
  }


  return(
    <>
      <Box m={'1rem'} >
        <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
          <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
            My plants
          </Typography>
          <Box sx={{ borderBottom: 3, borderColor: 'text.light' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tab my plants" variant="fullWidth" >
              <Tab label={LabelMyPlants(locations && locations.data.length, 'locations')} {...a11yProps(0)}/>
              <Tab label={LabelMyPlants(5, 'Plants')} {...a11yProps(1)}/>
              <Tab label={LabelMyPlants(5, 'Pictures')} {...a11yProps(2)}/>
            </Tabs>
          </Box>
        </AppBar>

          <TabPanel value={value} index={0} >
              <Stack spacing={2} direction="column" >
                {locations && locations.data.map(location => <LocationMyPlants key={location.id} location={location} />)}
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