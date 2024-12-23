import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Stack, Box, TextField, Snackbar, Alert, Grid, CircularProgress, Typography, IconButton } from '@mui/material';
import CategoryItem from "../components/CategoryItem";
import { useForm, Controller } from 'react-hook-form';
import BasicSelect from "../components/BasicSelect";
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from '../store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';




const defaultValues = {
  name: '',
  lighttype: '',
  locationcategory: ''
};




const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddLocation = () => {
  const id = useStore(state => state.userId);
  const { handleSubmit, formState: { errors }, register, control, reset } = useForm({ defaultValues });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const addLocation = async ({data}) => {
    return await fetch(`${backendUrl}/api/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
    }).then(r => r.json());
  }



  const mutation = useMutation(addLocation, {
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries('locations');

      reset();
      navigate(-1);
    }
  })



  const handleCloseSnackbar = () => {
    mutation.reset();
  }
  
  const { isLoading: locationIsLoading, data: locationcategories } = useQuery("locationcategories", async () => {
    const data = await fetch(`${backendUrl}/api/locationcategories?populate=*`).then(r => r.json());
    return data;
  });

  const onSubmit = data => {
    console.log('clicked submit');
    if(!data.name){
      const categoryId = data.locationcategory;
      data.name = locationcategories.data.find(category => category.id.toString() === categoryId).attributes.name;
    }

    data.lighttype = data.lighttype.toString();
    data.profile = profile.data[0].id

    mutation.mutate({data})
  }


  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      user_id: {
          $eq: id,
      },
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const { data: profile} = useQuery(["profile", query], async() => {
    const data = await fetch(`${backendUrl}/api/profiles?${query}`).then(r => r.json());
    return data;
  })



  const { isLoading: lighttypesIsLoading, data: lighttypes } = useQuery("lighttypes", async () => {
    const data = await fetch(`${backendUrl}/api/lighttypes`).then(r => r.json());
    return data;
  });

  return(
    <Box m={2}>
        <IconButton aria-label="back" onClick={()=> navigate(-1)} >
          <ArrowBackIosIcon/>
        </IconButton>
      <Stack sx={{ flex: 1 }}  as="form" spacing={4} noValidate onSubmit={handleSubmit(onSubmit)}>
      {locationcategories &&
      <>
      
        <Typography component='h2' variant='h2' textAlign={'center'}>
          Select a location
        </Typography>
        <div>
          <Typography sx={{color:'error.dark', marginBottom: 2}}>{errors?.locationcategory?.message}</Typography>
        <Grid container spacing={1.5} mt={'-1rem'}>          
            {locationcategories.data.map(location => 
            <Grid key={location.id} item xs={4}>
                <label> 
                  <CategoryItem category={location}/> 
                  <input 
                    type="radio"  
                    name="locationcategory" 
                    value={location.id} 
                    required
                    {...register("locationcategory", {
                      required: 'Please select a location'
                    })}/>
                    
                </label>
              </Grid>
              )}
              
          </Grid> 
        </div>
        <div>
        <Typography variant="h3" component="p" sx={{marginBottom:'.5rem'}}>
            Give your location a name
          </Typography>
          <TextField
            fullWidth
            id="name"
            label="Name"
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register("name")} />
        </div>
     <div>
         <Typography variant="h3" component="p" sx={{marginBottom:'.5rem'}}>
            How much light is there?
          </Typography>
         <Controller
          control={control}
          name="lighttype"
          rules={{required: "Pick a light type"}} 
          render={({field, fieldState}) => <BasicSelect error={fieldState.error} field={field} label="Amount of light" options={lighttypesIsLoading ? [] : lighttypes.data.map(type => ({id: type.id, name: type.attributes.name}))} />}
        /> 
        </div> 
        { profile &&
        <LoadingButton loading={mutation.isLoading} loadingIndicator="Adding location" type="submit" variant="contained">
          Add location
        </LoadingButton>
        }
        <Snackbar open={mutation.isSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Location added
          </Alert>
        </Snackbar>
       </>
      }

      {locationIsLoading && <CircularProgress />}
      </Stack>
    </Box>
  )
}

export default AddLocation