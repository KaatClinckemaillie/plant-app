import { Stack, Avatar, Typography, IconButton, Checkbox, CircularProgress, Alert, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from "react-router-dom";
import { useStore } from '../store';
import { useEffect, useState } from "react";

const label = {inputProps: { 'aria-label': 'checkbox test'}}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Task = ({task, upcoming}) => {
  const myPlants = useStore(state => state.plants);
  const queryClient = useQueryClient();
  const taskId = task.id;
  const plantId = task.attributes.plant.data.id ;
  const plant = myPlants.data.filter(plant => plant.id === plantId)[0];
  const watering = plant.attributes.plantsort.data.attributes.watering;
  console.log(upcoming)
  
  const removeTask = async (data) => {
    return await fetch(`${backendUrl}/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(data),
    }).then(r => r.json());
  }


  const mutation = useMutation(removeTask, {
    onSuccess : () => {
      console.log("success")
      queryClient.invalidateQueries('tasks');
    }
  })


  const calculateDue = (actionDays) => {
    const current = new Date();
    const dueAction = new Date();
    dueAction.setDate(current.getDate() + actionDays);
    const actionMonth = ('0'+(dueAction.getMonth()+1)).slice(-2);
    const actionDay = ('0'+(dueAction.getDate())).slice(-2);
    return `${dueAction.getFullYear()}-${actionMonth}-${actionDay}`;
  }

  const handleCheckTask = () => {
    const data = {}
    if(task.attributes.action.data.attributes.name === 'Water') {
      data.due = calculateDue(watering)
    }else if(task.attributes.action.data.attributes.name === 'Repot') {
      data.due = calculateDue(356);
    }else if(task.attributes.action.data.attributes.name === 'Update') {
      data.due = calculateDue(30);
    }
  
    console.log(data);
    mutation.mutate({data})
  }


  


  

  return(
    <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
      <Avatar sx={{ width: 72, height: 72 }} alt={plant.attributes.cover.data.attributes.alternativeText}  src={plant.attributes.cover.data.attributes.url}  />
        <Stack component={Link} to={`/plant/${plantId}`} spacing={-.5} width={200}>
          <Typography variant="body1" component="p">
            {task.attributes.plant.data.attributes.name}
          </Typography>
          <Typography variant="body1" component="p" sx={{color: 'text.hint', pb:2}}>
             { plant.attributes.location.data.attributes.name }
          </Typography>
          {upcoming && <Chip label={task.attributes.action.data.attributes.name} sx={{width: '6rem'}}/>}
        </Stack>       
      <div>
      {!upcoming &&  <Checkbox {...label} onClick={handleCheckTask} icon={<RadioButtonUncheckedIcon  fontSize="large" color="primary"/>} checkedIcon={<CheckCircleIcon fontSize="large"/>} />}
      </div>
    </Stack>
  );
}

export default Task