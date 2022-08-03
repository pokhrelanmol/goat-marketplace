import React, { useState } from "react";
import CreateGoat from "./components/forms/CreateGoat";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/layout/Navigation";

function App() {
    return (
        <div className="App max-w-7xl mx-auto">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list-goat" element={<CreateGoat />} />
            </Routes>
        </div>
    );
}

export default App;
