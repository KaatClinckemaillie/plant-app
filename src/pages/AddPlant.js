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


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AddPlant = () => {
  const { plantsortId } = useParams();
  const userId = useStore(state => state.userId);
  console.log(userId);
  const navigate = useNavigate();
  const { handleSubmit, formState: { errors }, register, control, reset, watch } = useForm();
  const queryClient = useQueryClient();



  const addPlant = async ({data}) => {
    const formData = new FormData();
    if(data.cover.length > 0) {
      formData.append("files.cover", data.cover[0], data.cover[0].name)
    }
    formData.append("data", JSON.stringify({...data, cover:null}));    
    return await fetch(`${backendUrl}/api/plants`, {
      method: "POST",
      body: formData,
    }).then(r => r.json());    
  }

  const mutation = useMutation(addPlant, {
    onSuccess : () => {
      console.log("success")
      queryClient.invalidateQueries('plants');
      
      reset()
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
    if(!data.cover){
      data.cover = plantsort.data.attributes.cover.data.id;
    } 

    console.log(data)
    mutation.mutate({data})
  }

  const handleCloseSnackbar = () => {
    mutation.reset();
  }


  const { isLoading, data: locations } = useQuery("locations", async () => {
    const data = await fetch("http://localhost:1337/api/locations?populate=*").then(r => r.json());
    return data;
  });

  if(locations){
    console.log(locations)
  }

  const { isLoading: plantsortIsLoading, data: plantsort } = useQuery("plantsort", async () => {
    const data = await fetch(`${backendUrl}/api/plantsorts/${plantsortId}?populate=*`).then(r => r.json());
    return data;
  });

  if(plantsort){
    return(
      <Box m={3}>
        <IconButton aria-label="back" onClick={()=> navigate(-1)} >
          <ArrowBackIosIcon/>
        </IconButton>
        <Stack sx={{ flex: 1 }}  as="form" spacing={4} noValidate onSubmit={handleSubmit(onSubmit)} > 
          {/* hier een foto van de plant */}
          <Stack alignItems={'center'} my={5}>
          <Avatar sx={{ width: 200, height: 200 }} alt={plantsort.data.attributes.cover.data.attributes.alternativeText}  src={plantsort.data.attributes.cover.data.attributes.url}/>
          <Stack direction="row" spacing={2} alignItems="center">
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
          
          <Typography variant="h2" component="p">
            Name your plant?
          </Typography>
          <TextField
            fullWidth
            id="name"
            label="Name"
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register("name")} />
          
          <LoadingButton fullWidth loading={mutation.isLoading} loadingIndicator="Adding plant" type="submit" variant="contained">Add Plant</LoadingButton>
          <Snackbar open={mutation.isSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Restaurant added
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