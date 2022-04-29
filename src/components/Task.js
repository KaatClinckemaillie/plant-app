import { Stack, Avatar, Typography, IconButton, Checkbox, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from "react-router-dom";
import { useStore } from '../store';

const label = {inputProps: { 'aria-label': 'checkbox test'}}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Task = ({task}) => {
  const myPlants = useStore(state => state.plants);
  console.log(myPlants)
  const queryClient = useQueryClient();
  const taskId = task.id
  console.log(taskId);

  const removeTask = async () => {
    return await fetch(`${backendUrl}/api/tasks/${taskId}`, {method: "DELETE"} )
  }


  const mutation = useMutation(removeTask, {
    onSuccess : () => {
      console.log("success")
      queryClient.invalidateQueries('tasks');
    }
  })

  const handleCheckTask = () => {
    console.log('check');
    mutation.mutate()
  }


  const plantId = task.attributes.plant.data.id ;
  const plant = myPlants.data.filter(plant => plant.id === plantId)[0];

  console.log(plant);

  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      <Avatar sx={{ width: 72, height: 72 }} alt={plant.attributes.cover.data.attributes.alternativeText}  src={plant.attributes.cover.data.attributes.url}  />
        <Stack component={Link} to={`/plant/${plantId}`} spacing={-.5} width={200}>
          <Typography variant="body1" component="p">
            {task.attributes.plant.data.attributes.name}
          </Typography>
          <Typography variant="body1" component="p" sx={{color: 'text.hint'}}>
             { plant.attributes.location.data.attributes.name }
          </Typography>
        </Stack>       
      <div>
        <Checkbox {...label} onClick={handleCheckTask} icon={<RadioButtonUncheckedIcon  fontSize="large" color="primary"/>} checkedIcon={<CheckCircleIcon fontSize="large"/>} />
      </div>
    </Stack>
  );
}

export default Task