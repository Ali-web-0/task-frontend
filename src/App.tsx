import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
