import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/userContext";
import { auth } from "../../firebase.config";
import Button from "../Button";

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { setToast } = useToast();
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    name: "",
                    image: "",
                    email: "",
                    id: "",
                });
                navigate("/");
                setToast({
                    type: "success",
                    msg: "Logged out successfully",
                    show: true,
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
