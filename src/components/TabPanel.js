import { Box} from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{marginTop: "11rem"}}
    >
      {value === index && (
        <Box sx={{ p: 1, m:'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );  
}

export default TabPanel