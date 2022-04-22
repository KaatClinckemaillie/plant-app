import { Stack, Avatar, Typography, IconButton, Checkbox, CircularProgress, Alert } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg'
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";

const label = {inputProps: { 'aria-label': 'checkbox test'}}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Task = ({task}) => {

  const plantId = task.attributes.plant.data.id ;

  const {data: plants } = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?populate=*`).then(r => r.json());
    return data;
  });


  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      <Avatar sx={{ width: 72, height: 72 }} alt="Remy Sharp" src={plants && plants.data[plantId - 1].attributes.cover.data.attributes.formats.small.url} />
      <Link to={`/plant/${plantId}`}>
        <Stack spacing={-.5} width={200}>
          <Typography variant="body1" component="p">
            {task.attributes.plant.data.attributes.name}
          </Typography>
          <Typography variant="body1" component="p" sx={{color: 'text.hint'}}>
            {plants && plants.data[plantId - 1].attributes.location.data.attributes.name}
          </Typography>
        </Stack>
      </Link>
      <IconButton aria-label="postpone or skip task" >
        <NotificationsPausedIcon fontSize="large"/>
      </IconButton>
      <div>
        <Checkbox {...label} icon={<RadioButtonUncheckedIcon fontSize="large" color="primary"/>} checkedIcon={<CheckCircleIcon fontSize="large"/>} />
      </div>
    </Stack>
  );
}

export default Task