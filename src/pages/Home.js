import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Stack, CircularProgress, Alert, Typography, Button } from '@mui/material';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store';

import BasicSpeedDial from '../components/BasicSpeedDial';




import Tasks from '../components/Tasks';
import TasksWeek from '../components/TasksWeek';


const Tab = styled(TabUnstyled)`
  color:${'#6E7A64'};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: regular;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;


  &.${tabUnstyledClasses.selected} {
    background-color: ${'#214622'};
    color: ${'#DEFFBF'};
    border-radius: 30px;
  }

`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 90vw;
`;

const TabsList = styled(TabsListUnstyled)`
  background-color: ${'#D4DDC5'};
  border-radius: 30px;
  margin: auto;
  margin-bottom: 16px;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;

`;

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const setPlants = useStore(state => state.setPlants);
  const myPlants = useStore(state => state.plants);
  console.log(myPlants)
  const username = useStore(state => state.username);
  console.log(username)

  const id = useStore(state => state.userId);
  console.log(id);


  
  const qs = require('qs');
    const query = qs.stringify({
    filters: {
      profile:{
        user_id: {
          $eq: id,
        },
      }
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });


  //get data
  const { isLoading: tasksLoading, error: tasksError, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch(`${backendUrl}/api/tasks?${query}`).then(r => r.json());
    return data;
  }); 

  const { isLoading: actionsLoading, error: actionsError, data: actions } = useQuery("actions", async () => {
    const data = await fetch(`${backendUrl}/api/actions`).then(r => r.json());
    return data;
  }); 

  const {data: plants, isloading: plantsLoading} = useQuery("plants", async() => {
    const data = await fetch(`${backendUrl}/api/plants?${query}`).then(r => r.json());
    return data;
  })

  // set my plants in store
  if(plants) {
    setPlants(plants);
  }

  //get date
  const current = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(current.getDate() + 7);

  const month = ('0'+(current.getMonth()+1)).slice(-2);
  const day = ('0'+(current.getDate())).slice(-2);
  const date = `${current.getFullYear()}-${month}-${day}`;

  const nextMonth = ('0'+(nextWeek.getMonth()+1)).slice(-2);
  const nextDay = ('0'+(nextWeek.getDate())).slice(-2);
  const dateNextWeek = `${nextWeek.getFullYear()}-${nextMonth}-${nextDay}`;
  console.log(dateNextWeek)
  //check if everythin loaded
  if(tasks && actions && plants){
    return(
      <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <h2>Home</h2>
        <BasicSpeedDial />
        {/* check if user have already some plants (if not => display button 'add plants'; else => show tasks) */}
        {plants.data.length > 0 ?           
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Today</Tab>
              <Tab>Upcoming</Tab>
            </TabsList>
            <TabPanel value={0}>
              <Stack spacing={4}>
                { tasks && actions.data.map(action => <Tasks key={action.id} action={action.attributes.name} tasks={tasks.data.filter(task => task.attributes.action.data.id === action.id && task.attributes.due <= date)} />)}
              </Stack>
            </TabPanel>
            <TabPanel value={1}>
            {console.log(tasks)}
             {
               tasks && <Tasks action={'Next week'} tasks={tasks.data.filter(task => task.attributes.due > date && task.attributes.due <= dateNextWeek)}/>
             }  
            </TabPanel>
          </TabsUnstyled>            
     : 
      <Stack>
        <Typography>
          Add some plants to your profile!
        </Typography>
        <Button>Add Plants</Button>
      </Stack> 
     }
     </Box>
    )

  }else if(actionsLoading || tasksLoading || plantsLoading){
    return(
      <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CircularProgress />
      </Box>
    )
  }else {
    return(
    <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Alert severity="error">Something went wrong</Alert>
    </Box>  
    )
  }


}

export default Home;