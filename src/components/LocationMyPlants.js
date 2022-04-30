import { ImageList, Typography, Grid, ImageListItem, Chip, Paper } from '@mui/material';
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
  const plants = useStore(state => state.plants).data.filter(plant => plant.attributes.location.data.id === location.id);
  console.log(location)
  console.log(plants)
  console.log(plants[0])
  console.log(plants[1])
  


  return(
    <Grid component={Link} to={`/location/${location.id}`} container spacing={1} sx={{m:'auto'}}>
      <Grid item xs={12} padding={0}>
        <ImageList 
          sx={{height: 183, width: 369}}
          variant="quilted" 
          cols={4} 
          rowHeight={90}
          gap={3}
          >
          <ImageListItem key={1} cols={2} rows={2}>
            {plants[0] ? 
              <img {...srcset(plants[0].attributes.cover.data.attributes.url, 90, 2, 2)}  alt={plants[0].attributes.cover.data.attributes.alternativeText} loading="lazy"/>
              : <Paper sx={{height: 183, width: 183, bgcolor: 'primary.light', borderRadius: 0}} elevation={0}/>
            }            
          </ImageListItem>

          <ImageListItem key={2} cols={1} rows={1}>
            {plants[1] ? 
              <img {...srcset(plants[1].attributes.cover.data.attributes.url, 90, 1, 1)}  alt={plants[1].attributes.cover.data.attributes.alternativeText} loading="lazy"/>
              : <Paper sx={{height: 90, width: 90, bgcolor: 'primary.light', borderRadius: 0}} elevation={0}/>
            } 
          </ImageListItem>

          <ImageListItem key={3} cols={1} rows={2}>
            {plants[2] ? 
              <img {...srcset(plants[2].attributes.cover.data.attributes.url, 90, 1, 2)}  alt={plants[2].attributes.cover.data.attributes.alternativeText} loading="lazy"/>
              : <Paper sx={{height: 183, width: 90, bgcolor: 'primary.light', borderRadius: 0}} elevation={0}/>
            }             
          </ImageListItem>

          <ImageListItem key={4} cols={1} rows={1}>
            {plants[2] ? 
              <img {...srcset(plants[2].attributes.cover.data.attributes.url, 90, 1, 1)}  alt={plants[2].attributes.cover.data.attributes.alternativeText} loading="lazy"/>
              : <Paper sx={{height: 90, width: 90, bgcolor: 'primary.light', borderRadius: 0}} elevation={0}/>
            } 
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
    </Grid>
  )
}

export default LocationsMyPlants