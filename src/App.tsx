import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useAppSelector } from './store/hooks';
import { selectTheme } from './store/theme/themeReducer';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import lightTheme from './theme/lightTheme';
import darkTheme from './theme/darkTheme';
import Footer from './components/Footer';
import Product from './pages/Product';
import View from './pages/View';
import Crypto from './pages/Crypto';
import Shop from './pages/Shop';
import News from './pages/News';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Article from './pages/Article';
import Profile from './pages/Profile';
import UserUpdater from './store/user/userUpdater';

const Updaters = () => {
 
  return (
    <>
      <UserUpdater />
    </>
  )
}

function App() {
  const theme = useAppSelector(selectTheme);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Updaters />
      <NavBar />
      <Box sx={{minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path="/view/:category" element={<View />} />
          <Route path="/news" element={<News />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/account" element={<Profile /> } />
        </Routes>
      </Box>
      <Footer />
    </ThemeProvider>
      
  );
}

export default App;
