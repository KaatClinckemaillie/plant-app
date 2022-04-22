
import * as React from 'react';
import { styled } from '@mui/system';
import { Stack } from '@mui/material';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';


import Tasks from './Tasks';


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


const TabBar = () => {
  return(
    
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Today</Tab>
        <Tab>Upcoming</Tab>
      </TabsList>
      <TabPanel value={0}>
        <Stack spacing={4}>
          <Tasks action={'Water'}/>
        </Stack>
      </TabPanel>
      <TabPanel value={1}>
        Upcoming akjhtmohgroiahregopiagoipr
        </TabPanel>
    </TabsUnstyled>
  );
}

export default TabBar;
