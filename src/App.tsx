import CreateGoat from "./pages/CreateGoat";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { auth } from "./firebase.config";

function App() {
    return (
        <div className="App max-w-6xl mx-auto">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list-goat" element={<CreateGoat />} />
                {auth.currentUser && (
                    <Route path="/dashboard" element={<Dashboard />} />
                )}
                {/* 404 routes */}
                <Route path="*" element={<NotFound />} />
                <Route path="" element={<NotFound />} />
                <Route element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
