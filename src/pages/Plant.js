import { Paper, Grid, Box, Typography, Stack, CardMedia, Button } from '@mui/material';
import { useQuery } from 'react-query';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { useParams } from "react-router-dom";

const lightTypeLocation = 'full sun';
const lightTypePlant = 'full sun';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plant = () => {
  const { plantSortId } = useParams();
  console.log(plantSortId)
  const { isLoading, error, data: plantsort } = useQuery("plantsort", async () => {
    // nu hardcoded met plantsoort id = 2
    const data = await fetch(`${backendUrl}/api/plantsorts/${plantSortId}?populate=*`).then(r => r.json());
    return data;
  });

  const {data: myPlants} = useQuery("myPlants", async () => {
    const data = await fetch(`${backendUrl}/api/plants?populate=*`).then(r => r.json());
    return data;
  });

let recommended = false;

  if(lightTypeLocation === lightTypePlant){
    recommended = true
  }

  let check = false;
  let loaded = false;
  if(plantsort && myPlants){
    // dus hier ook de hardcoded plantensoort id = 2
    const plant = myPlants.data.find(plant => plant.attributes.plantsort.data.id === plantSortId);
    
    console.log(myPlants.data[0].attributes.plantsort.data.id)
    console.log(plant)
    if(plant){
      check = true;
    }
    loaded = true
  }

  console.log(check)

  return(
    <>
    {plantsort && console.log(plantsort.data.attributes.cover.data.attributes.url)}
{/*     <img
        src={plant && `${plant.data.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
        srcSet={plant && `${plant.data.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={'item.title'}
        loading="lazy"
      /> */}

    <CardMedia
        component="img"
        alt={plantsort && plantsort.data.attributes.cover.data.attributes.alternativeText}
        height="400"
        image={plantsort && plantsort.data.attributes.cover.data.attributes.url}
      />

     

    <Box m={'1rem'}>
      <Stack direction="column" justifyContent={'center'}>
        <Button sx={{bgcolor:'primary.main', color:'#fff', mb:2, borderRadius:5, py:1}}>{loaded && (check ? 'Add Picture' : 'Add Plant')}</Button> 
        <Stack direction="row" spacing={3} justifyContent={'center'}>
          <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
            <PriorityHighIcon/>
            <Typography m={'auto'}>
              toxic
            </Typography>  
          </Paper>
          <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
            <WbSunnyIcon/>
            <Typography>
              full sun
            </Typography>  
          </Paper>
          <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
            <OpacityIcon />
            <Typography>
              high
            </Typography>  
          </Paper>
        </Stack>
      </Stack>
    </ Box>
    </>
  )
}

export default Plant




        