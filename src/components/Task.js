import { Stack, Avatar, Typography, IconButton, Checkbox, CircularProgress, Alert } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";

const label = {inputProps: { 'aria-label': 'checkbox test'}}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Task = ({task}) => {
  
  const plantId = task.attributes.plant.data.id ;
  
  console.log(plantId)

  const {data: plants } = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?populate=*`).then(r => r.json());
    return data;
  });

  let plantSortId = -1

  // zoek de id van de plantensoort
  // zoek in de tabel van de eigen planten naar een plant die de id heeft van plantensoort
  if(plants){    
    const plant = plants.data.find(plant => plant.id === plantId)
    console.log(plant)
    plantSortId = plant.attributes.plantsort.data.id
  }

  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      {plants && console.log(plants.data.filter(plant => plant.id === plantId)[0].attributes.cover.data.attributes.url)}
      <Avatar sx={{ width: 72, height: 72 }} alt="Remy Sharp"  src={plants && plants.data.filter(plant => plant.id === plantId)[0].attributes.cover.data.attributes.url}  />
      <Link to={`/plant/${plantSortId >= 0 && plantSortId}`}>
        <Stack spacing={-.5} width={200}>
          <Typography variant="body1" component="p">
            {task.attributes.plant.data.attributes.name}
          </Typography>
          <Typography variant="body1" component="p" sx={{color: 'text.hint'}}>
             { plants && plants.data.filter(plant => plant.id === plantId)[0].attributes.location.data.attributes.name  }
          </Typography>
        </Stack>
      </Link>
      <div>
        <Checkbox {...label} icon={<RadioButtonUncheckedIcon fontSize="large" color="primary"/>} checkedIcon={<CheckCircleIcon fontSize="large"/>} />
      </div>
    </Stack>
  );
}

export default Task