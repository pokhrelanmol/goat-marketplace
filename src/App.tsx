import React, { useState } from "react";
import Login from "./components/auth/Login";
import CreateGoat from "./components/forms/CreateGoat";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Navigation from "./components/layout/Navigation";

function App() {
    return (
        <div className="App max-w-4xl mx-auto">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
