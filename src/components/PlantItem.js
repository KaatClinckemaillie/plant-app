import {Stack, Typography, Divider, IconButton} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {Link} from 'react-router-dom';

const PlantItem = ({plant, kind}) => {

  let personal = true;
  if(kind === 'public') {
    personal = false;
  }
  console.log(personal);
  console.log(plant);
  return(
    <>
      <Stack py={2} direction={'row'} spacing={3} component={Link} to={personal ? `/plant/${plant.id}` : `/plantsort/${plant.id}`} alignItems='center' justifyContent={'space-between'}>
        <img alt={plant.attributes.cover.data.attributes.alternativeText} src={plant.attributes.cover.data.attributes.url} height={120} width={120}/>
        <Stack>
          <Typography variant="h3" component="p">
            {plant.attributes.name}
          </Typography>
          <Typography variant="body1" component="p">
            {personal ? plant.attributes.location.data.attributes.name : ''}
          </Typography>
        </Stack>
        <IconButton>
          <NavigateNextIcon/>
        </IconButton>
      </Stack>

      <Divider light />
    </>
  )
}

export default PlantItem