import { Paper, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import Task from './Task';
import { useQuery } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const Tasks = ({ action }) => {
  const current = new Date();
  const month = ('0'+(current.getMonth()+1)).slice(-2);
  const date = `${current.getFullYear()}-${month}-${current.getDate()}`;

  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      due: {
        $lte: date,
      },      
    },
    populate : '*'
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch(`${backendUrl}/api/tasks?${query}`).then(r => r.json());
    return data;
  });


  return(
    <Paper elevation={0} sx={{borderRadius:5, px: 3, py: 4}}>      
      <Typography variant="h2" component="h3">
          {action}        
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Stack spacing={5} sx={{mt: 4}}>
        {tasks && tasks.data.filter(task => task.attributes.action.data.attributes.name === action).map(task => <Task key={task.id} task={task}/>)}
      </Stack>
      
    </Paper>
  );
}

export default Tasks