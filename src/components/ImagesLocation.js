import { ImageList, ImageListItem } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg';
import { useQuery } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImagesLocation = ({plants}) => {


  return(
    <ImageList 
      sx={{height: 184, width: 364}}
      variant="quilted" 
      cols={4} 
      rowHeight={90}>
      <ImageListItem key={1} cols={2} rows={2}>
        <img {...srcset(plants[1] && plants[1].attributes.cover, 90, 2, 2)}  alt={'planttitle'} loading="lazy"/>
      </ImageListItem>
      <ImageListItem key={2} cols={1} rows={1}>
        <img {...srcset(montsera, 90, 1, 1)}  alt={'planttitle'} loading="lazy"/>
      </ImageListItem>
      <ImageListItem key={3} cols={1} rows={2}>
        <img {...srcset(montsera, 90, 1, 2)}  alt={'planttitle'} loading="lazy"/>
      </ImageListItem>
      <ImageListItem key={4} cols={1} rows={1}>
        <img {...srcset(montsera, 90, 1, 1)}  alt={'planttitle'} loading="lazy"/>
      </ImageListItem>
      {console.log(plants)}
    </ImageList>
  )
}

export default ImagesLocation;