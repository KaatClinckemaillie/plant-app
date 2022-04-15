import { Paper, ImageList, Typography, Grid, ImageListItem, Chip } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg'

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LocationsMyPlants = () => {
  return(
    <Grid container spacing={1} sx={{m:'auto'}}>
      <Grid item xs={12} padding={0}>
          <ImageList 
            sx={{height: 184, width: 364}}
            variant="quilted" 
            cols={4} 
            rowHeight={90}>
            <ImageListItem key={montsera} cols={2} rows={2}>
              <img {...srcset(montsera, 90, 2, 2)}  alt={'planttitle'} loading="lazy"/>
            </ImageListItem>
            <ImageListItem key={montsera} cols={1} rows={1}>
              <img {...srcset(montsera, 90, 1, 1)}  alt={'planttitle'} loading="lazy"/>
            </ImageListItem>
            <ImageListItem key={montsera} cols={1} rows={2}>
              <img {...srcset(montsera, 90, 1, 2)}  alt={'planttitle'} loading="lazy"/>
            </ImageListItem>
            <ImageListItem key={montsera} cols={1} rows={1}>
              <img {...srcset(montsera, 90, 1, 1)}  alt={'planttitle'} loading="lazy"/>
            </ImageListItem>
          </ImageList>
      </Grid>
      <Grid item xs={8} paddingLeft={2}>
        <Typography component="h4" variant="h2">
          Living Room
        </Typography>
        <Typography component="p" variant="subtitle1">
          4 PLANTS
        </Typography>        
      </Grid>
      <Grid item xs={4} sx={{display:'grid', placeContent:'top end'}} paddingRight={3}>
        <Chip label="6 taken" color="error" />
      </Grid>
    </Grid>
  )
}

export default LocationsMyPlants