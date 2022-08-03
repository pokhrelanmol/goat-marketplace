import React, { useEffect, useState } from "react";
import GoatDataServices from "../../services/goats-services";
import {
    GoogleAuthProvider,
    signInWithPopup,
    User,
    UserCredential,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { Button, Carousel } from "flowbite-react";
const Login = () => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((userCred) => {
                GoatDataServices.addUser({
                    email: userCred.user.email,
                    name: userCred.user.displayName,
                    id: userCred.user.uid,
                    image: userCred.user.photoURL,
                }).then((user) => {
                    console.log(user);
                });
                //     redirect to homepage
                //     provide data for profile page
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className=" ">
            <button type="button" className="bg-red-500">
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
