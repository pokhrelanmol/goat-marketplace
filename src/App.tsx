import React, { useState } from "react";
import CreateGoat from "./pages/CreateGoat";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Dashboard from "./pages/Dashboard";
import { useUser } from "./contexts/userContext";
import _404 from "./pages/_404";

function App() {
    const { user } = useUser();
    return (
        <div className="App max-w-6xl mx-auto">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list-goat" element={<CreateGoat />} />
                {user.email && (
                    <Route path="/dashboard" element={<Dashboard />} />
                )}
                {/* 404 routes */}
                <Route path="*" element={<_404 />} />
                <Route path="" element={<_404 />} />
                <Route element={<_404 />} />
            </Routes>
        </div>
    );
}

export default App;
