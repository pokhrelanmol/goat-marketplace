import React from "react";
type ButtonType =
    | "pink-outline"
    | "pink-filled"
    | "dark-outline"
    | "dark-filled";
interface ButtonProps {
    buttonType: ButtonType;
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit";
    disabled?: boolean;
}
const Button = ({
    buttonType,
    onClick,
    children,
    type = "button",
    disabled = false,
}: ButtonProps) => {
    const buttonStyle =
        buttonType === "pink-filled"
            ? "bg-secondaryPink hover:bg-white hover:text-secondaryPink border border-secondaryPink focus:ring-red-50 text-white"
            : buttonType === "pink-outline"
            ? "bg-transparent hover:bg-secondaryPink hover:text-white border border-secondaryPink focus:ring-red-50 text-secondaryPink"
            : buttonType === "dark-filled"
            ? "bg-primaryDark hover:bg-white hover:text-primaryDark border border-primaryDark focus:ring-red-50 text-white"
            : buttonType === "dark-outline"
            ? "bg-transparent hover:bg-secondaryDark hover:text-white border border-primaryDark focus:ring-red-50 text-primaryDark"
            : "bg-secondaryPink hover:bg-white hover:text-secondaryPink border border-primaryDark focus:ring-red-50 text-white";
    return (
        <button
            className={` ${buttonStyle}
                     trasition delay-150 ease-in-out focus:ring-4 rounded-lg px-4 py-2  text-center uppercase 
            `}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
