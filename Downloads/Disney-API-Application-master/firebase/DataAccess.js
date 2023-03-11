import {auth, app, db, getFirestore, doc, setDoc, getDoc} from "./config";

const getCloudData = async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log('No such document!');
        }
    } catch (e) {
        console.log(e);
    }
}

const storeCloudData = async (comments, data) => {
    try {
        await setDoc(doc(db, "users", auth.currentUser.email), {
            comments: comments,
            data: data
        });
    } catch (e) {
        console.log(e);
    }
}

const getCommentsData = async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().comments;
        } else {
            console.log('No such document!');
        }
    } catch (e) {
        console.log(e);
    }
}

export {getCloudData, storeCloudData, getCommentsData}