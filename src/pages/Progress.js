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
                title={new Date(`${progress.data.attributes.createdAt}`).getDate() + ' ' + new Date(`${progress.data.attributes.createdAt}`).toLocaleString('default', {month: 'short'})}
              />
              <ImageListItemBar
                sx={{background: 'none'}}
                position='top'
                actionIcon={
                  <IconButton aria-label="back" onClick={()=> navigate(-1)}>
                    <CloseIcon fontSize='large' sx={{color:'black'}} />
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