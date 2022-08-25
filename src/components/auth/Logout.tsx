import { signOut } from "firebase/auth";
import { useUser } from "../../contexts/userContext";
import { auth } from "../../firebase.config";
import Button from "../Button";

const Logout = () => {
    const { setUser } = useUser();
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
