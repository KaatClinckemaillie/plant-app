import { Paper, Typography, Stack } from '@mui/material';
import Task from './Task';
import { useQuery } from 'react-query';

const Tasks = ({ action }) => {

  const { isLoading, error, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch("http://localhost:1337/api/tasks?populate=*/1").then(r => r.json());
    console.log(data)
    return data;
  });

  return(
    <Paper elevation={0} sx={{borderRadius:5, px: 3, py: 4}}>
      <Typography variant="h2" component="h3">
          {action}
      </Typography>
      <Stack spacing={5} sx={{mt: 4}}>
        <Task />
        <Task />
        <Task />
      </Stack>
      
    </Paper>
  );
}

export default Tasks