import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Stack, Box, TextField, Snackbar, Alert, CircularProgress, Typography, Avatar, Button, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import BasicSelect from "../components/BasicSelect";
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useStore } from '../store';

const Input = styled('input')({
  display: 'none',
});

const defaultValues = {
  name: '',
  location: '',
};
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddPlant = () => {
  const { plantsortId } = useParams();
  const userId = useStore(state => state.userId);
  console.log(userId);
  const navigate = useNavigate();
  const { handleSubmit, formState: { errors }, register, control, reset, watch } = useForm({defaultValues});
  const queryClient = useQueryClient();
  const id = useStore(state => state.userId);

  const qs = require('qs');
  const query = qs.stringify({
    filters: {
      profile:{
        user_id: {
          $eq: id,
        },
      }
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const queryProfile = qs.stringify({
    filters: {
      user_id: {
          $eq: id,
      },
    },
    populate : '*',
  }, {
    encodeValuesOnly: true,
  });

  const addPlant = async ({data}) => {
    console.log(data)
    const formData = new FormData();


    if(isNaN(data.cover) && data.cover.length > 0) {

      formData.append("files.cover", data.cover[0], data.cover[0].name)
      formData.append("data", JSON.stringify({...data, cover:null}));    
      return await fetch(`${backendUrl}/api/plants`, {
        method: "POST",
        body: formData,
      }).then(r => r.json());   
    }else {

      return await fetch(`${backendUrl}/api/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
      }).then(r => r.json());
    }
 
  }

  const mutation = useMutation(addPlant, {
    onSuccess : () => {
      console.log("success");

      queryClient.invalidateQueries('plants');
      
      reset()
      navigate(-2);
    },
  })
  
  const onSubmit = data => {
    console.log('pressed submit');
    data.plantsort = plantsortId;
    console.log(data);
    if(!data.name){
      data.name = plantsort.data.attributes.name
    }

    console.log(data.cover)
 
    if(data.cover.length === 0 || !data.cover){
      data.cover = plantsort.data.attributes.cover.data.id;
    }
    data.profile = profile.data[0].id
    console.log(data)
    mutation.mutate({data})
  }

  const handleCloseSnackbar = () => {
    mutation.reset();
  }


  const { isLoading: locationIsLoading, data: locations } = useQuery(["locations", query], async () => {
    const data = await fetch(`${backendUrl}/api/locations?${query}`).then(r => r.json());
    return data;
  });

  if(locations){
    console.log(locations)
  }

  const { isLoading: plantsortIsLoading, data: plantsort } = useQuery(["plantsort", plantsortId], async () => {
    const data = await fetch(`${backendUrl}/api/plantsorts/${plantsortId}?populate=*`).then(r => r.json());
    return data;
  });

  const { data: profile} = useQuery(["profile", queryProfile], async() => {
    const data = await fetch(`${backendUrl}/api/profiles?${queryProfile}`).then(r => r.json());
    return data;
  })

  if(plantsort && profile){
    return(
      <Box m={3}>
        <IconButton aria-label="back" onClick={()=> navigate(-1)} >
          <ArrowBackIosIcon/>
        </IconButton>
        <Stack sx={{ flex: 1 }}  as="form" spacing={4} noValidate onSubmit={handleSubmit(onSubmit)} > 
          {/* hier een foto van de plant */}
          <Stack alignItems={'center'} my={5}>
          <Avatar sx={{ width: 200, height: 200 }} alt={plantsort.data.attributes.cover.data.attributes.alternativeText}  src={plantsort.data.attributes.cover.data.attributes.url}/>
          <Stack spacing={2} alignItems="center">
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" {...register("cover")}/>
              <Button  component="span" disabled={mutation.isLoading}>
                Upload your own image
              </Button>
            </label>
            <Typography>{watch("cover") && watch("cover").length > 0 && watch("cover")[0].name}</Typography>
          </Stack>
          </Stack>
          {/* {locations && <BasicSelect items={locations} label={'Location'}/>} */}
          <div>
          <Typography variant="h3" component="p" mb={2}>
            Want to give your plant a personal name?
          </Typography>
          <TextField
            fullWidth
            id="name"
            label="Name"
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register("name")} />
          </div>
         <Controller
          control={control}
          name="location"
          rules={{required: "Pick a location"}} 
          render={({field, fieldState}) => <BasicSelect error={fieldState.error} field={field} label="Location" options={locationIsLoading ? [] : locations.data.map(type => ({id: type.id, name: type.attributes.name}))} />}
        />           
          <LoadingButton fullWidth loading={mutation.isLoading} loadingIndicator="Adding plant" type="submit" variant="contained">Add Plant</LoadingButton>
          <Snackbar open={mutation.isSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Plant added
            </Alert>
          </Snackbar>
        </Stack>  
      </Box>
    )
  }else{
    return(
      <Box>
        <CircularProgress />
      </Box>
    )
  }

}

export default AddPlant;