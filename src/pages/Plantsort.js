import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from 'react-query';
import PlantInfo from '../components/PlantInfo';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Paper, Grid, Box, Typography, Stack, CardMedia, Button, CircularProgress, IconButton } from '@mui/material';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plantsort = () => {
  const { plantsortId } = useParams();
  const navigate = useNavigate();

  const {data: plantsort} = useQuery(["plantsort", plantsortId], async () => {
    const data = await fetch(`${backendUrl}/api/plantsorts/${plantsortId}?populate=*`).then(r => r.json());
    return data;
  });
  
  if(plantsort){
  return(
    <>
    <IconButton aria-label="back" onClick={()=> navigate(-1)} >
      <ArrowBackIosIcon/>
    </IconButton>
    <CardMedia
        component="img"
        alt={plantsort.data.attributes.cover.data.attributes.alternativeText}
        height="400"
        image={plantsort.data.attributes.cover.data.attributes.url}
      />    
    <Box m={'1rem'}>
      <Stack direction="column" justifyContent={'center'}>
        <Button component={Link} to={`/addPlant/${plantsort.data.id}`} sx={{bgcolor:'primary.main', color:'#fff', mb:2, borderRadius:5, py:1}}>Add Plant</Button> 
        <PlantInfo />

      </Stack>
    </ Box>
    </>
  )
    }else{
      return(
        <CircularProgress />
      )
    }
}

export default Plantsort;