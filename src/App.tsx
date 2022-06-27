import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import { useAppSelector } from './store/hooks';
import { selectTheme } from './store/theme/themeReducer';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import lightTheme from './theme/lightTheme';
import darkTheme from './theme/darkTheme';
import Footer from './components/Footer';

function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <NavBar />
      <Box sx={{minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      <Footer />
    </ThemeProvider>
      
  );
}

export default App;
