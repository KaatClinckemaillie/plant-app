import {Paper, Typography, Stack} from '@mui/material'

const CareItem = ({icon, textBig, textSmall, color}) => {
  return(
    <Stack my={2} direction={'row'} alignItems={'center'} spacing={2}>
      <Paper elevation={0} sx={{borderRadius: '50%', width: '80px', height: '80px', bgcolor: `${color}`,lineHeight: '80px',textAlign:'center', color:'white', fontSize: '32px'}}>
        {icon}
      </Paper>
      <Stack>
        <Typography component='p' variant='body1' fontSize={20} >
          {textBig}
        </Typography>     
        <Typography component='p' variant='subtitle1' fontSize={16} lineHeight={.5} color={'#94A292'}>
          {textSmall && textSmall}
        </Typography>  
      </Stack>     
    </Stack>
  )

}

export default CareItem