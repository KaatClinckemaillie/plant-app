import { IconButton, AppBar, Typography, Stack, Chip, Box, Alert, CircularProgress, Divider, Link} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store';
import { useQuery } from 'react-query';
import PlantItem from '../components/PlantItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const Location = () => {
  const { locationId } = useParams();
  const id = useStore(state => state.userId);
  const navigate = useNavigate();

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

  const { data: location } = useQuery(["location", locationId], async () => {
    const data = await fetch(`${backendUrl}/api/locations/${locationId}?populate=*`).then(r => r.json());
    return data;
  });     

  if(location){
    console.log(location);
  }

  if(plants){
    console.log(plants)
  return(
    <Box m={'1rem'}>
      <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0} >
        <Stack alignItems={'flex-start'}>
          <IconButton onClick={()=> navigate(-1)} aria-label="back" sx={{textAlign:'left', m:1}}>
            <ArrowBackIcon fontSize='large'/>
          </IconButton>
          <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 1, mb: 3}}>
            {location && location.data.attributes.name}
          </Typography>
          <Stack direction={'row'} mx={4} spacing={2} mb={2}>
            {location &&
              <>
                <Chip label={location.data.attributes.lighttype.data.attributes.name } />
                <Chip label={location.data.attributes.locationcategory.data.attributes.inside ? 'inside' : 'outside'} />
              </>
            }
            
          </Stack>
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