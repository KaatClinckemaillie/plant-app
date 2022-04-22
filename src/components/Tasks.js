import { Paper, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import Task from './Task';
import { useQuery } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Tasks = ({ action }) => {

  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      action: {
        $eq: {},
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch(`${backendUrl}/api/tasks?populate=*`).then(r => r.json());
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
        {tasks && tasks.data.filter(task => task.attributes.action.data.attributes.name === action).map(task => <Task key={task.id} task={task}/>)}
      </Stack>
      
    </Paper>
  );
}

export default Tasks