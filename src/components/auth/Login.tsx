import UserServices from "../../services/user-services";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import Button from "../Button";
const Login = () => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((userCred) => {
                UserServices.addUser({
                    email: userCred.user.email,
                    name: userCred.user.displayName,
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
            <Button buttonType="pink-filled" onClick={loginWithGoogle}>
                Login
            </Button>
        </div>
    );
};

export default Login;
