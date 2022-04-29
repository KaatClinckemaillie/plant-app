import { Grid, Stack, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

const CategoryItem = ({category}) => {
  return(
      <Stack>
        <img alt={category.attributes.cover.data.attributes.alternativeText} src={category.attributes.cover.data.attributes.url} height={120} width={120}/>
        <Typography width={120} align={'center'} mt={1}>
          {category.attributes.name}
        </Typography>
      </Stack>
  )
}

export default CategoryItem