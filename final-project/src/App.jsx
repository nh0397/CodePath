import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation, Navigate} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import './App.css';

function App() {
    return (<Router>
        <div className="app">
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
        </div>
    </Router>);
}

export default App;

