import { auth, db, storage } from "../firebase-config";
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
    onSnapshot,
} from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";

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
    getGoats() {
        const allGoats = onSnapshot(query(goatCollectionRef), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(data);
            return data;
        });
        return allGoats;
    }
    getGoat(id) {
        const goatDoc = doc(db, "goats", id);
        return getDoc(goatDoc);
    }
    getUserGoats() {
        const userId = auth.currentUser.uid;
        const q = query(
            collection(db, "goats"),
            where("userId", "==", `${userId}`)
        );
        onSnapshot(q, (snapshot) => {
            const goats = [];
            snapshot.docs.map((doc) => {
                goats.push({ ...doc.data(), id: doc.id });
            });
            console.log(goats);
            return goats;
        });
    }
    // upload image base64 string to firebase storage and return download url
    async uploadImagesBase64(images) {
        let urls = [];
        for (let image of images) {
            const imageRef = ref(storage, `images/${image.name}`);
            const snapshot = await uploadString(
                imageRef,
                image.dataURL,
                "data_url"
            );
            const downloadableUrl = await getDownloadURL(snapshot.ref);
            urls = [...urls, downloadableUrl];
        }
        console.log(urls);
        return urls;
    }
}
export default new GoatService();
