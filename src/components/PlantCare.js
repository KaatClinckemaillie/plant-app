import {Paper, Typography, Stack} from '@mui/material';
import CareItem from './CareItem';
import OpacityIcon from '@mui/icons-material/Opacity';
import GrassIcon from '@mui/icons-material/Grass';
import { CheckCircleOutline } from '@mui/icons-material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import Brightness6Icon from '@mui/icons-material/Brightness6';

const PlantCare = ({plantsort}) => {
  const checkIcon = () => {
    if(plantsort.data.attributes.lighttype.data.id === 3){
      return <Brightness6Icon fontSize='large' sx={{marginTop: '1.3rem'}}/>
    }else if( plantsort.data.attributes.lighttype.data.id === 2) {
      return <CloudIcon fontSize='large' sx={{marginTop: '1.3rem'}}/>
    }else{
      return <WbSunnyIcon fontSize='large' sx={{marginTop: '1.3rem'}}/>
    }

  }
  return(
    <>
      <Typography component='h2' variant='hidden' >
        Care
      </Typography>
      <Paper elevation={0} sx={{px:3, mt:1, py:3, borderRadius: 5, mb: 5}}>
        <Typography component='h3' variant='h1' mb={1}>
          Water
        </Typography>
        <CareItem icon={plantsort.data.attributes.watering} textBig={`Water every ${plantsort.data.attributes.watering} days`}  color={'#303C52'}/>
        <CareItem icon={<OpacityIcon fontSize='large' sx={{marginTop: '1.3rem'}}/>} textBig={plantsort.data.attributes.soiltype.data.attributes.instruction}  textSmall={plantsort.data.attributes.soiltype.data.attributes.need} color={'#303C52'}/>
      </Paper>
      <Paper elevation={0} sx={{px:3, mt:1, py:3, borderRadius: 5, mb: 5}}>
        <Typography component='h3' variant='h1' mb={1}>
          Repot
        </Typography>
        <CareItem icon={<GrassIcon fontSize='large' sx={{marginTop: '1.3rem'}} />} textBig={'Every year'} textSmall={'Repot'}  color={'#4A3307'}/>
      </Paper>
      <Paper elevation={0} sx={{px:3, mt:1, py:3, borderRadius: 5, mb: 5}}>
        <Typography component='h3' variant='h1' mb={1}>
          Light
        </Typography>
        <CareItem icon={checkIcon()} textBig={plantsort.data.attributes.lighttype.data.attributes.name}  color={'#EFE0A4'}/>
      </Paper>
    </>
  )

}

export default PlantCare