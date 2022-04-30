import { Box, Typography, Grid, CircularProgress, Alert, AppBar, Link } from '@mui/material';
import { useQuery } from 'react-query';
import CategoryItem from '../components/CategoryItem';
//import {Link} from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Search = () => {

  const { isLoading, error, data: plantcategories } = useQuery("plantcategories", async () => {
    const data = await fetch(`${backendUrl}/api/plantcategories?populate=*`).then(r => r.json());
    return data;
  });

  return (
    <Box m={'1rem'}>
      <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
        <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
          Find plants
        </Typography>   
      </AppBar> 
      <Grid container spacing={3} justifyContent={'center'} mt={15}>
        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">Something went wrong</Alert>}
        {plantcategories && plantcategories.data.map(category =><Grid key={category.id} item component={Link} to={`/plantCategory/${category.id}`}> <CategoryItem category={category}  /> </Grid>)}
      </Grid>  
    </Box>
  )
}

export default Search;