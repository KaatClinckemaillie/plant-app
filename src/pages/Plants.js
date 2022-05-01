import { Typography, AppBar, Tabs, Tab, Box, List, Stack, CircularProgress, Alert, Button } from '@mui/material';
import * as React from 'react';
import TabPanel from '../components/TabPanel';
import LabelMyPlants from '../components/LabelMyPlants';
import LocationMyPlants from '../components/LocationMyPlants';
import PlantMyPlants from '../components/PlantMyPlants';
import StandardImagesList from '../components/StandardImageList';
import PlantItem from '../components/PlantItem';
import { useQuery } from 'react-query';
import { useStore } from '../store';
import { Link } from "react-router-dom";

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

  const { isLoading: loadingLocations, error, data: locations } = useQuery(["locations", query], async () => {
    const data = await fetch(`${backendUrl}/api/locations?${query}`).then(r => r.json());
    return data;
  });

  const {data: plants, isLoading: loadingPlants} = useQuery(["plants", query], async () => {
    const data = await fetch(`${backendUrl}/api/plants?${query}`).then(r => r.json());
    return data;
  });

  const { data: progresses } = useQuery(['progresses', query], async () => {
    const data = await fetch(`${backendUrl}/api/progresses?${query}`).then(r => r.json());
    return data
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  if(plants) {
    setPlants(plants);
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
              <Tab label={LabelMyPlants(locations ? locations.data.length : '', 'locations')} {...a11yProps(0)}/>
              <Tab label={LabelMyPlants(plants ? plants.data.length : '', 'Plants')} {...a11yProps(1)}/>
              <Tab label={LabelMyPlants(progresses ? progresses.data.length : '', 'Pictures')} {...a11yProps(2)}/>
            </Tabs>
          </Box>
        </AppBar>

          <TabPanel value={value} index={0} >
            <Stack alignItems={'center'} mb={5}>
              <List sx={{ width: '100%'}} >
                {plants && locations && locations.data.map(location => <LocationMyPlants key={location.id} location={location} />)}
                {loadingLocations && <CircularProgress/>}
              </List>
              <Button component={Link} to='/addLocation' variant="contained" size="medium" color="primary" aria-label="add location" sx={{width:200, mt:5}}>
                Add location
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <Stack alignItems={'center'} mb={5}>
              <List sx={{ width: '100%', maxWidth: 360}}>
                {plants && plants.data.map(plant => <PlantItem key={plant.id} plant={plant} kind={'personal'}/>)}
                {loadingPlants && <CircularProgress/>}
              </List> 
              <Button component={Link} to='/search' variant="contained" size="medium" color="primary" aria-label="add location" sx={{width:200, mt:5}}>
                  Add plants
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {progresses && <StandardImagesList itemData={progresses.data}/>}
        </TabPanel>
      </Box>

    </>
  )

}

export default Plants;