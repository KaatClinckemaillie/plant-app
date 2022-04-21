import { Stack, Avatar, Typography, IconButton, Checkbox } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg'
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useQuery } from 'react-query';

const label = {inputProps: { 'aria-label': 'checkbox test'}}

const Task = () => {



    const {  data: plants } = useQuery("plants", async () => {
    const data = await fetch("http://localhost:1337/api/plants?populate=*").then(r => r.json());
    return data;
  });

  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      <Avatar sx={{ width: 72, height: 72 }} alt="Remy Sharp" src={plants && `${plants.data[0].attributes.cover.data.attributes.formats.small.url}`} />
      <Stack spacing={-.5} width={200}>
        <Typography variant="body1" component="p">
          Montsera
        </Typography>
        <Typography variant="body1" component="p" sx={{color: 'text.hint'}}>
          Office
        </Typography>
      </Stack>
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