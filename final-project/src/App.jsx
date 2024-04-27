import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation, Navigate} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import './App.css';
import ProtectedRoute from "./services/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";


const Layout = ({children}) => {
    const location = useLocation();
    const hideNavbarOnRoutes = ["/login", "/signup",'/forgot-password'];
    const showNavbar = !hideNavbarOnRoutes.includes(location.pathname);


    return (<>
        {showNavbar && <Navbar/>}
        <div>{children}</div>
    </>);
};

function App() {
    return (<Router>
        <div className="app">
            <Layout/>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/student" element={<ProtectedRoute>
                </ProtectedRoute>}/>
            </Routes>
        </div>
    </Router>);
}

export default App;

