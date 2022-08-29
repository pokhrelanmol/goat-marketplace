import { db } from "../firebase.config";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
const userCollectionRef = collection(db, "users");
class UserServices {
    async checkIfUserExists(id) {
        const q = query(userCollectionRef, where("id", "==", id));
        return getDocs(q);
    }
    addUser(newUser) {
        return addDoc(userCollectionRef, newUser);
    }
}
export default new UserServices();
