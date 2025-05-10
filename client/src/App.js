// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindJobsPage from './pages/FindJobsPage';
import PostJobPage from './pages/PostJobPage';
import ContactPage from './pages/ContactPage';
import EmployeeProfilePage from './pages/MyProfilePage';
import EmployerPage from './pages/EmployerPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import NavJ from './components/NavJ';
import NavE from './components/NavE';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';  


function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/findjobs" element={<FindJobsPage />} />
          <Route path="/postjob" element={<PostJobPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/employer" element={<EmployerPage />} /> */}
          <Route path="/register" element={<RegistrationPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          {/* Use PrivateRoute for protected routes */}
          <Route
            path="/myprofile"
            element={
              <PrivateRoute>
                <EmployeeProfilePage />  {/* Protected route for job seekers */}
              </PrivateRoute>
            }
          />
          <Route
            path="/employer"
            element={
              <PrivateRoute>
                <EmployerPage />  {/* Protected route for employers */}
              </PrivateRoute>
            }
          />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;