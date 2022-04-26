import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Stack, CircularProgress, Alert, Fab } from '@mui/material';
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


  const { isLoading: tasksLoading, error: tasksError, data: tasks } = useQuery("tasks", async () => {
    const data = await fetch(`${backendUrl}/api/tasks?${query}`).then(r => r.json());
    return data;
  }); 

  const { isLoading: actionsLoading, error: actionsError, data: actions } = useQuery("actions", async () => {
    const data = await fetch(`${backendUrl}/api/actions`).then(r => r.json());
    return data;
  }); 


    const current = new Date();
    const month = ('0'+(current.getMonth()+1)).slice(-2);
    const date = `${current.getFullYear()}-${month}-${current.getDate()}`

    if(tasks && actions){

      return (
        <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <h2>Home</h2>

          <BasicSpeedDial />

          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Today</Tab>
              <Tab>Upcoming</Tab>
            </TabsList>
            <TabPanel value={0}>
              <Stack spacing={4}>
                {actions.data.map(action => <Tasks key={action.id} action={action.attributes.name} tasks={tasks.data.filter(task => task.attributes.action.data.id === action.id && task.attributes.due <= date)} />)}
              </Stack>
            </TabPanel>
            <TabPanel value={1}>
              <TasksWeek title={'This week'}/>
            </TabPanel>
            </TabsUnstyled>
            
        </Box>
      )
    }else if(actionsLoading || tasksLoading){
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