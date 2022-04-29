import { Typography, AppBar, Tabs, Tab, Box, List, Stack, CircularProgress, Alert, Button } from '@mui/material';
import * as React from 'react';
import TabPanel from '../components/TabPanel';
import LabelMyPlants from '../components/LabelMyPlants';
import LocationMyPlants from '../components/LocationMyPlants';
import PlantMyPlants from '../components/PlantMyPlants';
import PlantItem from '../components/PlantItem';
import { useQuery } from 'react-query';
import { useStore } from '../store';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,   
  }
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plants = () => {
  const [value, setValue] = React.useState(0);
  const setPlants = useStore(state => state.setPlants);
  const id = useStore(state => state.userId);


  const qs = require('qs');
    const query = qs.stringify({
    filters: {
      profile:{
        user_id: {
          $eq: id,
        },
      }
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: locations } = useQuery("locations", async () => {
    const data = await fetch(`${backendUrl}/api/locations?${query}`).then(r => r.json());
    return data;
  });

  const {data: plants} = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?${query}`).then(r => r.json());
    return data;
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  if(plants) {
    setPlants(plants);
  }

  if(locations && plants){


    console.log(locations)
  return(
    <>
      <Box m={'1rem'} >
        <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
          <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
            My plants
          </Typography>
          <Box sx={{ borderBottom: 3, borderColor: 'text.light' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tab my plants" variant="fullWidth" >
              <Tab label={LabelMyPlants(locations.data.length, 'locations')} {...a11yProps(0)}/>
              <Tab label={LabelMyPlants(plants.data.length, 'Plants')} {...a11yProps(1)}/>
              <Tab label={LabelMyPlants(5, 'Pictures')} {...a11yProps(2)}/>
            </Tabs>
          </Box>
        </AppBar>

          <TabPanel value={value} index={0} >
            <Stack alignItems={'center'}>
              <List sx={{ width: '100%', maxWidth: 360}}>
                {locations && locations.data.map(location => <LocationMyPlants key={location.id} location={location} />)}
              </List>
              <Button variant="contained" size="medium" color="primary" aria-label="add location" sx={{width:200, mt:5}}>
                Add location
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <Stack alignItems={'center'}>
              <List sx={{ width: '100%', maxWidth: 360}}>
                {plants && plants.data.map(plant => <PlantItem key={plant.id} plant={plant} kind={'personal'}/>)}
              </List> 
              <Button variant="contained" size="medium" color="primary" aria-label="add location" sx={{width:200, mt:5}}>
                  Add plants
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={2}>
            foto's
        </TabPanel>
      </Box>

    </>
  )
  }else if(isLoading){
    return(
      <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CircularProgress />
      </Box>    
    )
  }else {
    return(
      <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Alert severity="error">Something went wrong</Alert>
      </Box>        
    )
  }
}

export default Plants;