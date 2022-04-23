import { ImageList, Typography, Grid, ImageListItem, Chip } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg';
import { Link } from "react-router-dom";
import ImagesLocation from './ImagesLocation';


const LocationsMyPlants = ({location}) => {
  return(
    <div>
    <Link to="/location">
    <Grid container spacing={1} sx={{m:'auto'}} >
      <Grid item xs={12} padding={0}>
        <ImagesLocation plants={location.attributes.plants.data}/>
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
    </Link>
    
    </div>
  )
}

export default LocationsMyPlants