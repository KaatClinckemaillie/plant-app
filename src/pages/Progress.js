import { useParams, useNavigate, Link } from "react-router-dom";
import {Paper, ImageList, ImageListItem, ImageListItemBar, CircularProgress, IconButton, Box, Typography}from '@mui/material';
import { useQuery } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Progress = () => {
  const { progressId } = useParams();
  const navigate = useNavigate();


  const { isLoading, error, data: progress } = useQuery("progress", async () => {
    const data = await fetch(`${backendUrl}/api/progresses/${progressId}?populate=*`).then(r => r.json());
    return data;
  });

  if(progress) {
    console.log(progress)
  }

  return(
    <>
      <ImageList cols={1} sx={{width:'100%', marginTop: '-.1rem'}}>
        { progress && 
            <ImageListItem>
              <img
                src={`${progress.data.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
                alt={progress.data.attributes.cover.data.attributes.alternativeText}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                  height: '10rem'
              }}
                title={
                  <Typography component='h2'variant='h1' fontSize='2.5rem' sx={{mb: '-.5rem'}}>
                   { new Date(`${progress.data.attributes.createdAt}`).getDate() + ' ' + new Date(`${progress.data.attributes.createdAt}`).toLocaleString('default', {month: 'short'})}
                  </Typography>
                }
                subtitle={<Typography fontSize={20}>{progress.data.attributes.plant.data.attributes.name} </Typography>}
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
      <Box mx={2}>
       {progress &&  
        <>
          <Typography component='h2' variant='h2'>
            Note:
          </Typography>
          <Typography component='p' variant='body1'>
            {progress.data.attributes.note === '' ? 'no note added' :  progress.data.attributes.note }
          </Typography>
        </>
        } 
      </Box>
    </>
      
  )
}

export default Progress