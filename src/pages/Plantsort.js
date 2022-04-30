import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from 'react-query';
import PlantInfo from '../components/PlantInfo';
import PlantCare from "../components/PlantCare";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Paper, Grid, Box, Typography, Stack, CardMedia, Button, CircularProgress, IconButton, ImageListItemBar, ImageList, ImageListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plantsort = () => {
  const { plantsortId } = useParams();
  const navigate = useNavigate();

  const {data: plantsort, isLoading} = useQuery(["plantsort", plantsortId], async () => {
    const data = await fetch(`${backendUrl}/api/plantsorts/${plantsortId}?populate=*`).then(r => r.json());
    return data;
  });
  
  if(plantsort){
  return(
    <>
      <ImageList cols={1} sx={{width:'100%', marginTop: '-.1rem'}}>
        { plantsort && 
            <ImageListItem>
              <img
                src={`${plantsort.data.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
                alt={plantsort.data.attributes.cover.data.attributes.alternativeText}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                  height: '10rem'
              }}
                title={<Typography component='h2'variant='h1' fontSize='2.5rem' sx={{mb: '-.5rem'}}> {plantsort.data.attributes.name} </Typography>}
              />
              <ImageListItemBar
                sx={{background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                  height: '10rem'}}
                position='top'
                actionIcon={
                  <IconButton aria-label="back" onClick={()=> navigate(-1)} sx={{marginTop: '-5rem'}}>
                    <CloseIcon fontSize='large' sx={{color:'white'}} />
                  </ IconButton>
                }
                actionPosition='left'
              />
            </ImageListItem>
        }
        {isLoading && <CircularProgress />}
      </ImageList>
    <Box m={'1rem'}>
      {plantsort && 
      <Stack direction="column" justifyContent={'center'}>    
        <PlantInfo plantsort={plantsort}/>   
        <Button component={Link} to={`/addPlant/${plantsort.data.id}`} sx={{bgcolor:'primary.main', color:'#fff', mb:2, borderRadius:5, py:1}}>Add Plant</Button>         
        <PlantCare plantsort= {plantsort}/>
      </Stack>
      } 
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