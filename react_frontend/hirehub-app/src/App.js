import './App.css';
// import Navbar from './components/Navbar';
import Navbar from './components/NavbarRevise';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Course from './components/pages/Course';
import Inbox from './components/pages/Inbox';
import Account from './components/pages/Account';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import CoursePage from './components/pages/CoursePage'
import { UserProvider, UserContext } from './userContext';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import SearchResult from './components/pages/SearchResult';

/**
 * The root component
 */

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
    button:{
      fontFamily: '"PT Sans", sans-serif',
      fontSize:16
    },
    h5:{
      fontFamily: '"PT Sans", sans-serif',
    }
  }
});

/**
 * Routes in general
 */

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

/**
 * Use Protected Routes to make sure that only login user can have access to our platform
 */

function AppRoutes() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Routes>
  {/* Set Login as the Index Route */}
  <Route path="/" element={<LoginPage />} />

  {/* Protected Routes */}
  <Route 
    path="/home" 
    element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} 
  />
  <Route 
    path="/course" 
    element={isAuthenticated ? <Course /> : <Navigate to="/" replace />} 
  />
  <Route 
    path="/courses/:id" 
    element={isAuthenticated ? <CoursePage /> : <Navigate to="/" replace />} 
  />
  <Route 
    path="/inbox" 
    element={isAuthenticated ? <Inbox /> : <Navigate to="/" replace />} 
  />
  <Route 
    path="/account" 
    element={isAuthenticated ? <Account /> : <Navigate to="/" replace />} 
  />
  <Route 
    path="/searchResult" 
    element={isAuthenticated ? <SearchResult /> : <Navigate to="/" replace />} 
  />

  {/* Other Public Routes */}
  <Route path="/registration" element={<RegistrationPage />} />
</Routes>
  );
}

export default App;