import { Paper, Grid, Box, Typography, Stack, ImageList, ImageListItem, ImageListItemBar, Button, CircularProgress, IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import PlantInfo from '../components/PlantInfo';
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import StandardImageList from '../components/StandardImageList';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Plant = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();

  const {data: plant, isLoading: plantLoading} = useQuery(["plant", plantId], async () => {
    const data = await fetch(`${backendUrl}/api/plants/${plantId}?populate=*`).then(r => r.json());
    return data;
  });

  const qs = require('qs');
    const query = qs.stringify({
    filters: {
      plant:{
        id: {
          $eq: plantId,
        },
      }
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const {data: progresses, isLoading: progressesLoading } = useQuery(['progresses', query], async() => {
    const data = await fetch(`${backendUrl}/api/progresses?${query}`).then(r => r.json());
    return data;    
  })
  

  return(
    <>
      <ImageList cols={1} sx={{width:'100%', marginTop: '-.1rem'}}>
        { plant && 
            <ImageListItem>
              <img
                src={`${plant.data.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
                alt={plant.data.attributes.cover.data.attributes.alternativeText}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                  height: '10rem'
              }}
                title={<Typography component='h2'variant='h1' fontSize='2.5rem' sx={{mb: '-.5rem'}}> {plant.data.attributes.name} </Typography>}
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
        {plantLoading && <CircularProgress />}
      </ImageList> 
    <Box m={'1rem'}>
      <Stack direction="column" justifyContent={'center'}>
        <Button component={Link} to={`/addPicture/${plantId}`} sx={{bgcolor:'primary.main', color:'#fff', mb:2, borderRadius:5, py:1}}>Add Picture</Button> 
      </Stack>
    </ Box>
    {progresses &&
      progresses.data.length > 0 ?
        <StandardImageList itemData={progresses.data}/>
      :
      <Typography mt={15} textAlign={'center'}>No pictures added</Typography>
      
    }
     {progressesLoading && <CircularProgress />}
    </>
  )

}

export default Plant




        