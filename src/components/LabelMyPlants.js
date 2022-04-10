import { Typography } from '@mui/material';


const LabelMyPlants = (value, name) => {
  return(
    <>
      <Typography component="p" variant="h2">
        {value}
      </Typography>
      <Typography component="h3" variant="subtitle1" sx={{mb:1}}>
        {name}
      </Typography>
    </>
  )
}

export default LabelMyPlants