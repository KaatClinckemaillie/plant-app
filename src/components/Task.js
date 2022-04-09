import { Stack, Avatar } from '@mui/material';
import montsera from '../assets/plants/montsera.jpeg'
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';

const Task = () => {
  return(
    <Stack direction='row' spacing={2} >
      <Avatar sx={{ width: 72, height: 72 }} alt="Remy Sharp" src={montsera} />
    </Stack>
  );
}

export default Task