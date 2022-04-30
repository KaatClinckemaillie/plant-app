import { Paper, Grid, Box, Typography, Stack, CardMedia, Button, CircularProgress, IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import PlantInfo from '../components/PlantInfo';
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plant = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();

  const {data: plant} = useQuery(["plant", plantId], async () => {
    const data = await fetch(`${backendUrl}/api/plants/${plantId}?populate=*`).then(r => r.json());
    return data;
  });
  
  if(plant){
  return(
    <>
    <IconButton aria-label="back" onClick={()=> navigate(-1)} >
      <ArrowBackIosIcon/>
    </IconButton>
    <CardMedia
        component="img"
        alt={plant && plant.data.attributes.cover.data.attributes.alternativeText}
        height="400"
        image={plant && plant.data.attributes.cover.data.attributes.url}
      />    
    <Box m={'1rem'}>
      <Stack direction="column" justifyContent={'center'}>
        <Button component={Link} to={`/addPicture/${plantId}`} sx={{bgcolor:'primary.main', color:'#fff', mb:2, borderRadius:5, py:1}}>Add Picture</Button> 

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

export default Plant




        