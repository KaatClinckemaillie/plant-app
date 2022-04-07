import { Stack, Avatar } from '@mui/material';

const Task = () => {
  return(
    <Stack direction='row' spacing={2} >
      <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="../assets/plants/montsera.jpg" />
    </Stack>
  );
}

export default Task