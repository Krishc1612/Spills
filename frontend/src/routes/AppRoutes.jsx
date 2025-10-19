import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/styles.css';
import UserRegister from '../pages/user/UserRegister';
import UserLogin from '../pages/user/UserLogin';
import Home from '../pages/General/Home'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/" element={<Home />} /> 
                {/* This would be the page to which user will be redirected to after register. */}
            </Routes>
        </Router>
    )
}

export default AppRoutes;