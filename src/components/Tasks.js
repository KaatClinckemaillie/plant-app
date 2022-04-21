import { Paper, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import Task from './Task';
import { useQuery } from 'react-query';

const Tasks = ({ action }) => {

  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      action: {
        $eq: {action},
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch(`http://localhost:1337/api/tasks?populate=*/${query}`).then(r => r.json());
    return data;
  });


  return(
    <Paper elevation={0} sx={{borderRadius:5, px: 3, py: 4}}>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Typography variant="h2" component="h3">
          {action}
      </Typography>
      <Stack spacing={5} sx={{mt: 4}}>
        {tasks && tasks.data.map(task => <Task key={task.id} task={task}/>)}

      </Stack>
      
    </Paper>
  );
}

export default Tasks