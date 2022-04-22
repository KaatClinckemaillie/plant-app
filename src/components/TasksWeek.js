import { Paper, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import { useQuery } from 'react-query';
import TaskWeek from './TaskWeek';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const TasksWeek = ({title}) => {

  const current = new Date();
  // date of tomorrow or first day of next week
  const startDate = new Date(current);
  const endDate = new Date(current);


  startDate.setDate(startDate.getDate() + 1);
  console.log(startDate)
  endDate.setDate(startDate.getDate() + 7);
  console.log(endDate)


  const startMonth = ('0'+(startDate.getMonth()+1)).slice(-2);
  const endMonth = ('0'+(endDate.getMonth()+1)).slice(-2);

  


  const start = `${startDate.getFullYear()}-${startMonth}-${startDate.getDate()}`;
  const end = `${endDate.getFullYear()}-${endMonth}-${endDate.getDate()}`;

  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      due: {
        $gte: start,
        $lt: end,
      },      
    },
    populate : '*'
  }, {
    encodeValuesOnly: true,
  });

  const { isLoading, error, data: tasksWeek } = useQuery("tasksWeek", async () => {
    const data = await fetch(`${backendUrl}/api/tasks?${query}`).then(r => r.json());
    return data;
  });

  return(
    <Paper elevation={0} sx={{borderRadius:5, px: 3, py: 4}}>      
      <Typography variant="h2" component="h3">
        {title}
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Stack spacing={5} sx={{mt: 4}}>
        {tasksWeek && tasksWeek.data.map(task => <TaskWeek key={task.id} task={task}/>)}
      </Stack>
      
    </Paper>
  )
}

export default TasksWeek