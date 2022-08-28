import React, { useContext, useState, createContext } from "react";
type ToastPropsType = {
    msg: string | null;
    type?: "success" | "error" | "warning";
    show: boolean;
};

type ToastContextType = {
    toast: ToastPropsType;
    setToast: React.Dispatch<React.SetStateAction<ToastPropsType>>;
};
const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastPropsType>({
        msg: "",
        show: false,
    });
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
};
export const useToast = () => useContext(ToastContext);
