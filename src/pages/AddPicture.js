import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, IconButton, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from '../store';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Input = styled('input')({
  display: 'none',
});


const AddPicture = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, formState: { errors }, register, reset, watch } = useForm();
  const queryClient = useQueryClient();
  const id = useStore(state => state.userId);

  const qs = require('qs');
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

  const { data: profile} = useQuery(["profile", queryProfile], async() => {
    const data = await fetch(`${backendUrl}/api/profiles?${queryProfile}`).then(r => r.json());
    return data;
  })


  const addPicture = async (data) => {
    data.profile = profile.data[0].id;
    data.plant = plantId;
    const formData = new FormData();
    
    if (data.cover.length > 0) {
      formData.append("files.cover", data.cover[0], data.cover[0].name);
    }
      formData.append("data", JSON.stringify({ ...data, cover: null }))

      return await fetch(`${backendUrl}/api/progresses`, {
        method: "POST",
        body: formData,
      }).then(r => r.json());
    
  };

  const mutation = useMutation(addPicture, {
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries('locations');
      reset();
      navigate(-1)
    }
  })

  const handleCloseSnackbar = () => {
    mutation.reset();
  }


  const onSubmit = data => {
    mutation.mutate(data)
  }


  return (
    <Box m={1}>
      <IconButton aria-label="back" onClick={()=> navigate(-1)} >
        <ArrowBackIosIcon/>
      </IconButton>
      <Typography component='h2' variant='h3' align={'center'}>
        Picture
      </Typography>
      <Paper elevation={0} sx={{margin: 1,marginTop: 4}}>
      <Stack sx={{ flex: 1 }}  as="form" spacing={4} noValidate onSubmit={handleSubmit(onSubmit)} p={3}>
        <Typography component='p' variant='h2'>
          Picture and note
        </Typography>   
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder="Write a note..."
          {...register("note")}
        />   
      <Stack  spacing={2} alignItems="center">
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" required {...register("cover", {required : 'Please add a picture'})} />
          <Button component="span" disabled={mutation.isLoading} sx={{margin:'auto', border:'dashed 0.1rem', py:'2rem', width:'21rem'}}>
            <CameraAltIcon fontSize="large"/>
          </Button>
        </label>
        <Typography>{watch("cover") && watch("cover").length > 0 && watch("cover")[0].name}</Typography>
        <Typography>{errors?.cover?.message}</Typography>
      </Stack>

        {
          profile &&
            <LoadingButton loading={mutation.isLoading} loadingIndicator="Adding location" type="submit" variant="contained">
            Save
          </LoadingButton>
        }
        
        <Snackbar open={mutation.isSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Picture added
          </Alert>
        </Snackbar>
      </Stack>
      </Paper>
    </Box>
  )
}

export default AddPicture