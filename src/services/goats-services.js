import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

const goatCollectionRef = collection(db, "goats");
const userCollectionRef = collection(db, "users");
class GoatDataService {
    addGoat(newGoat) {
        console.log(newGoat);
        return addDoc(goatCollectionRef, newGoat);
    }
    addUser(newUser) {
        console.log(newUser);
        return addDoc(userCollectionRef, newUser);
    }
    deleteGoat(id) {
        const goatDoc = doc(db, "goats", id);
        return deleteDoc(goatDoc);
    }
    updateGoat(id, updatedDoc) {
        const goatDoc = doc(db, "goats", id);
        return updateDoc(goatDoc, updatedDoc);
    }
    getGoats() {
        return getDocs(goatCollectionRef);
    }
    getGoat(id) {
        const goatDoc = (db, "goats", id);

        return getDoc(goatDoc);
    }
}
export default new GoatDataService();
