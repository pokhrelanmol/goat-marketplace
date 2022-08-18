import { db, storage } from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";

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
    // upload image base64 string to firebase storage and return download url

    async uploadImagesBase64(images) {
        let urls = [];
        for (let image of images) {
            const imageRef = ref(storage, "images");
            const snapshot = await uploadString(imageRef, image.base64);
            const downloadableUrl = await getDownloadURL(snapshot.ref);
            urls = [...urls, downloadableUrl];
        }

        return urls;
    }
}
export default new GoatDataService();
