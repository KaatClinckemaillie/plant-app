import TabBar from '../components/TabBar';
import Box from '@mui/material/Box';

const Home = () => {

  return (
    <Box mx={'1rem'} mb={'5rem'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <h2>Home</h2>
      <TabBar />
    </Box>
  )
}

export default Home;