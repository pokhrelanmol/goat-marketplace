import { db } from "../firebase.config";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";
const userCollectionRef = collection(db, "users");
class UserServices {
    checkIfUserExists(id) {
        query(userCollectionRef, where("id", "==", id)).onSnapshot(
            (snapshot) => {
                if (snapshot.empty) {
                    return false;
                }
                return true;
            }
        );
    }
    addUser(newUser) {
        return addDoc(userCollectionRef, newUser);
    }
}
export default new UserServices();
