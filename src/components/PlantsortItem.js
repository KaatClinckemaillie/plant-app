import {Stack, Typography} from '@mui/material';
import {Link} from 'react-router-dom'

const PlantsortItem = ({plantsort}) => {
  return(
    <Stack direction={'row'} spacing={3} component={Link} to={`/plantsort/${plantsort.id}`}>
      <img alt={plantsort.attributes.cover.data.attributes.alternativeText} src={plantsort.attributes.cover.data.attributes.url} height={120} width={120}/>
      <Typography variant="body1" component="p">
        {plantsort.attributes.name}
      </Typography>
    </Stack>
  )
}

export default PlantsortItem