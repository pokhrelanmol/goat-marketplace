import { auth, db, storage } from "../firebase.config";
import uniqid from "uniqid";
import {
    collection,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadString } from "firebase/storage";

const goatCollectionRef = collection(db, "goats");
class GoatService {
    addGoat(newGoat) {
        console.log(newGoat);
        return addDoc(goatCollectionRef, newGoat);
    }

    deleteGoat(id) {
        const goatDoc = doc(db, "goats", id);
        return deleteDoc(goatDoc);
    }
    updateGoat(id, updatedDoc) {
        const goatDoc = doc(db, "goats", id);
        return updateDoc(goatDoc, updatedDoc);
    }
    getGoat(id) {
        const goatDoc = doc(db, "goats", id);
        return getDoc(goatDoc);
    }

    // upload image base64 string to firebase storage and return download url
    async uploadImagesBase64(images) {
        let urls = [];
        for (let image of images) {
            const imageRef = ref(storage, `images/${image.name}${uniqid()}`);
            const snapshot = await uploadString(
                imageRef,
                image.dataURL,
                "data_url"
            );
            const downloadableUrl = await getDownloadURL(snapshot.ref);
            urls = [...urls, downloadableUrl];
        }
        return urls;
    }
}
export default new GoatService();
