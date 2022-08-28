import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import { DashboardContextProvider } from "./contexts/dashboardContext/DashboardContext";
import { ToastProvider } from "./contexts/ToastContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <DashboardContextProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </DashboardContextProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
