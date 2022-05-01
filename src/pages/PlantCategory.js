import { Box, Typography, Grid, CircularProgress, Alert, AppBar, IconButton, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import PlantItem from '../components/PlantItem';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const PlantCategory = () => {
  const navigate = useNavigate();
  const { plantCategoryId } = useParams();

  const qs = require('qs');
  const query = qs.stringify({
  filters: {
    plantcategory: {
      id: {
          $eq: plantCategoryId,
      },
    },
  },
  populate : '*'
}, {
  encodeValuesOnly: true,
});

  const {data: plantcategory} = useQuery(["plantcategory", plantCategoryId], async () => {
    const data = await fetch(`${backendUrl}/api/plantcategories/${plantCategoryId}`).then(r => r.json());
    return data;
  })

  const { isLoading, error, data: plantsorts } = useQuery(["plantsorts", query], async () => {
    const data = await fetch(`${backendUrl}/api/plantsorts?${query}`).then(r => r.json());
    return data;
  });


  return(
    <Box m={1}>
      <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
        <Stack direction={'row'} alignItems={'center'} m={4}>
          <IconButton aria-label="back" onClick={()=> navigate(-1)} >
            <ArrowBackIosIcon/>
          </IconButton>
          <Typography component="h2" variant="h3" sx={{color:'primary.main'}} >
            {plantcategory && plantcategory.data.attributes.name}
            {plantcategory && console.log(plantcategory.data.attributes.name)}
          </Typography>
        </Stack>
      </AppBar>
      <Stack mt={15} mx={3} >
        {plantsorts && plantsorts.data.map(plantsort => <PlantItem key={plantsort.id} plant={plantsort} kind={'public'}/>)}
      </Stack>
    </Box>
  )
}

export default PlantCategory
