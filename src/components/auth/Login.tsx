import UserServices from "../../services/user-services";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import Button from "../Button";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { toast, setToast } = useToast();
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const loginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
            // check if user exists in db
            const user = UserServices.checkIfUserExists(userCred.user.uid);
            console.log(user);

            if (false) {
                // setUser(user);
                console.log(user);
                navigate("/");
            } else {
                UserServices.addUser({
                    email: userCred.user.email,
                    name: userCred.user.displayName,
                    image: userCred.user.photoURL,
                    id: userCred.user.uid,
                });
            }
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
function setUser(user: any) {
    throw new Error("Function not implemented.");
}
