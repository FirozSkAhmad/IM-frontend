import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#1366D9',
    },
    secondary: {
      main: '#1570EF',
      contrastText: '#FFFFFF'
    },
    button: {
      main: '#1570EF',
    },
    description: {
      primary: '#637580'
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;