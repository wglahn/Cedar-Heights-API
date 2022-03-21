import { createTheme } from "@mui/material/styles";

const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#588157',
      },
      secondary: {
        main: '#da2c38',
      },
      background: {
        paper: '#f0ead2',
      },
      error: {
        main: '#f44336',
      },
    },
  };

const theme = createTheme(themeOptions);

export default theme