import { Grid, Stack, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

const CategoryItem = ({category}) => {
  console.log(category.attributes.cover.data.attributes)
  return(
    <Grid item component={Link} to={`/plantCategory/${category.id}`}>
      <Stack>
        <img alt={category.attributes.cover.data.attributes.alternativeText} src={category.attributes.cover.data.attributes.url} height={100} width={100}/>
        <Typography width={100} align={'center'} mt={1}>
          {category.attributes.name}
        </Typography>
      </Stack>
    </Grid>
  )
}

export default CategoryItem