import { signOut } from "firebase/auth";
import React from "react";
import { useUser } from "../../contexts/userContext";
import { auth } from "../../firebase-config";
import Button from "../Button";

const Logout = () => {
    const { user, setUser } = useUser();
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    name: "",
                    image: "",
                    email: "",
                    id: "",
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <Button buttonType="pink-filled" onClick={logout}>
            Logout
        </Button>
    );
};

export default Logout;
