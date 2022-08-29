import UserServices from "../../services/user-services";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import Button from "../Button";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
    const { toast, setToast } = useToast();
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const userCollectionRef = collection(db, "users");
    const loginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then(
            async (userCred) => {
                // check if user exists in db
                const user = await UserServices.checkIfUserExists(
                    userCred.user.uid
                );
                if (user.empty) {
                    UserServices.addUser({
                        email: userCred.user.email,
                        name: userCred.user.displayName,
                        image: userCred.user.photoURL,
                        id: userCred.user.uid,
                    });
                }
                navigate("/");
            }
        );
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
