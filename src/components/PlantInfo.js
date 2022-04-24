import { Paper, Typography, Stack } from '@mui/material';import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const PlantInfo = () => {
  return(
    <Stack direction="row" spacing={3} justifyContent={'center'}>
      <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
        <PriorityHighIcon/>
        <Typography m={'auto'}>
          toxic
        </Typography>  
      </Paper>
      <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
        <WbSunnyIcon/>
        <Typography>
          full sun
        </Typography>  
      </Paper>
      <Paper  elevation={0} sx={{borderRadius:5, width: 70, height:70, textAlign:'center', p:'.5rem'}} >
        <OpacityIcon />
        <Typography>
          high
        </Typography>  
      </Paper>
    </Stack>
  )
}

export default PlantInfo