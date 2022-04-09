import { Paper, Typography, Stack } from '@mui/material';
import Task from './Task'

const Tasks = () => {
  return(
    <Paper elevation={5} sx={{borderRadius:5, px: 3, py: 4}}>
      <Typography variant="h4" component="h2">
          Give water
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