import { Container, AppBar, Typography, Stack, Chip, Box, Alert, CircularProgress, Divider} from '@mui/material';
import { useParams } from 'react-router-dom'
import { useStore } from '../store';
import { useQuery } from 'react-query';
import PlantItem from '../components/PlantItem';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const Location = () => {
  const { locationId } = useParams();
  const id = useStore(state => state.userId);

  const qs = require('qs');
    const query = qs.stringify({
    filters: {
      profile:{
        user_id: {
          $eq: id,
        },
      },
      location:{
        id : {
          $eq : locationId,
        }
      }
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: plants} = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?${query}`).then(r => r.json());
    return data;
  });   

  if(plants){
    console.log(plants);
  }

  if(plants){
  return(
    <Box m={'1rem'}>
      <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0} >
        
        <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
          Living Room
        </Typography>
        <Stack direction={'row'} mx={4} spacing={2} mb={2}>
          <Chip label="Deels zon" />
          <Chip label="Binnen" />
        </Stack>
         <Divider light />
      </AppBar>
    <Stack mt={20}>
      {plants.data.map(plant => <PlantItem key={plant.id} plant={plant} kind={'personal'}/>)}
    </Stack>
    </Box>
  )
  } else if(isLoading) {
    return(
      <Box m={'1rem'}>
        <CircularProgress/>
      </Box>
    )
  } else {
    return(
      <Box m={'1rem'}>
        <Alert severity="error">Something went wrong</Alert>
      </Box>
    )    
  }
}

export default Location