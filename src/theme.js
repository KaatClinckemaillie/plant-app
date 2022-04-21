import { createTheme } from '@mui/material/styles';
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#214622',
      light: '#d4ddc5',
      dark: '#C4DEA9',
      contrastText: '#DEFFBF',
    },
    secondary: {
      main: '#729166',
      light: '#8fa28f',
      dark: '#53604a',
      contrastText: '#DFEFD4',
    },
    background: {
      default: '#F4F4F4',
    },
    text: {
      primary: '#214622',
      secondary: '#55614B',
      hint: '#8FA38F',
      disabled: '#6E7B64',
      light: '#DEE2DF'
    },
    warning: {
      main: '#facf5b',
      contrastText: '#69591b',
    },
    error: {
      main: '#ffdada',
      dark: '#821818',
      contrastText: '#821818',
    },
    divider: '#214622',
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    subtitle1: {
      letterSpacing: '0.1rem',
      fontWeight: 500,
      fontSize: '0.7rem',
    },
    h4: {
      fontSize: '1.2rem',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    
  },
});

export default theme