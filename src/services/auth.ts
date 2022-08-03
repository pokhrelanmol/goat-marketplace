import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";
import GoatDataServices from "./goats-services";
export const loginWithGoogle = () => {
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
export const logout = () => {
    auth.signOut()
        .then((user) => {
            console.log("loggedout");
        })
        .catch((err) => console.log(err));
};
