import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
const userCollectionRef = collection(db, "users");
class UserServices {
    addUser(newUser) {
        console.log(newUser);
        return addDoc(userCollectionRef, newUser);
    }
}
export default new UserServices();
