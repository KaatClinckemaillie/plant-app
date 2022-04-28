import { ImageList, Typography, Grid, ImageListItem, Chip } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg';
import { Link } from "react-router-dom";

import { useStore } from '../store';

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LocationsMyPlants = ({location}) => {
  const plants = useStore(state => state.plants);
  console.log(location)
  return(
    <Grid component={Link} to={`/location/${location.id}`} container spacing={1} sx={{m:'auto'}} >
      <Grid item xs={12} padding={0}>
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
      </Grid>
      <Grid item xs={8} paddingLeft={2}>
        <Typography component="h4" variant="h2">
          {location.attributes.name}
        </Typography>
        <Typography component="p" variant="subtitle1">
          {location.attributes.plants.data.length} PLANTS
        </Typography>        
      </Grid>
      <Grid item xs={4} sx={{display:'grid', placeContent:'top end'}} paddingRight={3}>
        <Chip label="6 taken" color="error" />
      </Grid>
    </Grid>
  )
}

export default LocationsMyPlants