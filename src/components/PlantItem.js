import {Stack, Typography} from '@mui/material';
import {Link} from 'react-router-dom'

const PlantItem = ({plantsort}) => {
  return(
    <Stack direction={'row'} spacing={3} component={Link} to={`/plantsort/${plantsort.id}`}>
      <img alt={plantsort.attributes.cover.data.attributes.alternativeText} src={plantsort.attributes.cover.data.attributes.url} height={100} width={100}/>
      <Typography variant="body1" component="p">
        {plantsort.attributes.name}
      </Typography>
    </Stack>
  )
}

export default PlantItem