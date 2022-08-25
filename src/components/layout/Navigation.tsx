import userEvent from "@testing-library/user-event";
import { Avatar, Button, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown, MdOutlineCancel } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { auth } from "../../firebase.config";
import Login from "../auth/Login";

const Navlink = ({ to, text }: { to: string; text: string }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `navlink ${isActive ? "text-gray-800" : "text-secondaryPink"}`
            }
        >
            {text}
        </NavLink>
    );
};
export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    useEffect(() => {
        // unsubscribe is a method to unsubscribe the onStateChange event

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setloading(false);
            if (user) {
                // redirect to homepage
                setUser({
                    name: user.displayName as string,
                    email: user.email as string,
                    id: user.uid,
                    image: user.photoURL as string,
                });
            }
        });
        return unsubscribe;
    }, []);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 shadow-md rounded-md mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start"
                    >
                        <img
                            onClick={() => navigate("/")}
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="w-8 mb-5 h-8 rounded-full cursor-pointer"
                        />
                        <button
                            className="text-secondaryPink cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            {navbarOpen ? (
                                <MdOutlineCancel />
                            ) : (
                                <AiOutlineMenu />
                            )}
                        </button>
                    </div>
                    <div
                        className={
                            "md:flex  flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                    >
                        {!loading && (
                            <ul className="flex flex-col md:flex-row list-none md:ml-auto items-center space-x-5">
                                {user.email ? (
                                    <>
                                        {/* userprofile */}
                                        <p onClick={() => setNavbarOpen(false)}>
                                            <Navlink
                                                to="list-goat"
                                                text="List Goat"
                                            />
                                        </p>

                                        <Tooltip
                                            content="User Dashboard"
                                            style="dark"
                                        >
                                            <Link
                                                to="/dashboard"
                                                onClick={() =>
                                                    setNavbarOpen(false)
                                                }
                                            >
                                                <div className="flex items-center cursor-pointer">
                                                    <Avatar
                                                        img={user.image}
                                                        rounded={true}
                                                    />

                                                    <span className=" before:content-['Hi,'] text-secondaryPink before:text-gray-600 before:text-xl">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Login />
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
