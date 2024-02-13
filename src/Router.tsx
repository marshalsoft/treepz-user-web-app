import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { CONSTANTS } from './includes/constant';
import LoginScreen from './pages/login';
import ResetPasswordScreen from './pages/reset_password';
import OTPScreen from './pages/otp';
import DashboardScreen from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePasswordScreen from './pages/create_password';

function App() {
  return (<BrowserRouter>
    <Routes>
    <Route path={CONSTANTS.Routes.Dashboard} element={<DashboardScreen />} >
    </Route>
    <Route path={CONSTANTS.Routes.Login} element={<LoginScreen />} />
    <Route path={CONSTANTS.Routes.ForgotPassword} element={<ResetPasswordScreen />} />
    <Route path={CONSTANTS.Routes.CreatePassword} element={<CreatePasswordScreen />} />
    {localStorage.getItem(CONSTANTS.Routes.ForgotPassword) && <>
    <Route path={CONSTANTS.Routes.Otp} element={<OTPScreen />} />
    </>}
    <Route path={"*"} element={<LoginScreen />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>);
}
   
export default App;
