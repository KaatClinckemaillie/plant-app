import { Paper, Typography, Stack } from '@mui/material';import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import OpacityIcon from '@mui/icons-material/Opacity';
import { styled } from '@mui/system';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import GrassIcon from '@mui/icons-material/Grass';


const StyledPaper = styled(Paper)`
  border-radius: 20%;
  width: 70px;
  height: 70px;
  text-align: center;
  padding: 0.5rem;
  background-color: ${'#D4DDC5'};
  box-shadow: none;
`;

const PlantInfo = ({plantsort}) => {
  console.log(plantsort)

  return(
    <Stack direction="row" spacing={3} justifyContent={'center'} mb={5} mt={2}>
      
      <StyledPaper   >
        <GrassIcon/>
        <Typography m={'auto'} fontSize={13}>
          {plantsort.data.attributes.level}
        </Typography>  
      </StyledPaper >


      <StyledPaper >
        <PriorityHighIcon/>
        <Typography m={'auto'} fontSize={13}>
          {plantsort.data.attributes.toxic ? 'Toxic' : 'Not toxic'}
        </Typography>  
      </StyledPaper >


      <StyledPaper    >
        {plantsort.data.attributes.lighttype.data.id === 3 && <Brightness6Icon/>}
        {plantsort.data.attributes.lighttype.data.id === 2 && <CloudIcon />}
        {plantsort.data.attributes.lighttype.data.id === 1 && <WbSunnyIcon />}
        <Typography m={'auto'} fontSize={13}>
          {plantsort.data.attributes.lighttype.data.attributes.name === 'Part sun, part shade' ? 'Part sun' : plantsort.data.attributes.lighttype.data.attributes.name}
        </Typography>  
      </StyledPaper >

      
      <StyledPaper  >
        <OpacityIcon />
        <Typography m={'auto'} fontSize={13}>
          {plantsort.data.attributes.soiltype.data.attributes.abbreviation}
        </Typography>  
      </StyledPaper >
    </Stack>
  )
}

export default PlantInfo