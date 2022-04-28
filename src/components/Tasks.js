import { Paper, Typography, Stack} from '@mui/material';
import Task from './Task';

const Tasks = ({ action, tasks }) => {


  return(
    <Paper elevation={0} sx={{borderRadius:5, px: 3, py: 4}}>      
      <Typography variant="h2" component="h3">
          {action}        
      </Typography>
      <Stack spacing={5} sx={{mt: 4}}>
        {tasks.length > 0 ? tasks.map(task => <Task key={task.id} task={task}/>) : 'All tasks are completed'}
      </Stack>
      
    </Paper>
  );
}

export default Tasks