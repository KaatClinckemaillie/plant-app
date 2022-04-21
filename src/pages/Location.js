import { Container, AppBar, Typography, Stack, Chip } from '@mui/material';

const Location = () => {
  return(
    <>
    <AppBar position="fixed" sx={{bgcolor: 'background.default'}} elevation={0}>
      
      <Typography component="h2" variant="h1" sx={{color: 'primary.main', mx:4, mt: 4, mb: 3}}>
        Living Room
      </Typography>
      <Chip label="Small" sx={{width:10}}/>


    </AppBar>
    <Container>
      Hello
    </Container>
    </>
  )
}

export default Location