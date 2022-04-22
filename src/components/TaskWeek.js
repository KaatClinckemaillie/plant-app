import { Stack, Avatar, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import { useQuery } from 'react-query';

const label = {inputProps: { 'aria-label': 'checkbox test'}}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const TaskWeek = ({task}) => {
  const plantId = task.attributes.plant.data.id ;

  const {isLoading, error, data: plants } = useQuery("plants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?populate=*`).then(r => r.json());
    return data;
  });

  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Avatar sx={{ width: 72, height: 72 }} alt="Remy Sharp" src={plants && plants.data[plantId - 1].attributes.cover.data.attributes.formats.small.url} />
      <Stack spacing={-.5} width={200}>
        <Typography variant="body1" component="p">
          {task.attributes.plant.data.attributes.name}
        </Typography>
        <Typography variant="body1" component="p" sx={{color: 'text.hint'}}>
          {plants && plants.data[plantId - 1].attributes.location.data.attributes.name}
        </Typography>
        <Chip label={task.attributes.action.data.attributes.name} sx={{width:100}}/>
      </Stack>

    </Stack>
  )
}

export default TaskWeek;