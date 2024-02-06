import { version } from "../constants/index.js";
import { firestore } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserData } from "../interfaces";


export const fetchUserData = async (uid) => {
    const docRef = await getDocs(query(collection(firestore, version + "-users"), where("uid", "==", uid)));
    let docs = [];
    docRef.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    if (docs.length === 0) {
        const docRef = await addDoc(collection(firestore, version + "-users"), new UserData(uid, []).toDoc());
        docs.push({ uid, id: docRef.id });
    }
    return docs;
}

export const updateUserData = async (obj) => {
    const docRef = await getDocs(query(collection(firestore, version + "-users"), where("uid", "==", obj.uid)));
    let docs = [];
    docRef.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    await setDoc(doc(firestore, version + "-users", docs[0].id), obj);
    return docs;
}

export const fetchBranches = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-branches")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const addBranch = async (doc) => {
    const docRef = await addDoc(collection(firestore, version + "-branches"), doc);
    return { ...doc, id: docRef.id };
}

export const deleteBranch = async (branchId) => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-courses"), where("branchId", "==", branchId)));
    querySnapshot.forEach((obj) => {
        deleteSlotsByCourseId(obj.id).then(() => console.log("deleted slots")).catch(e => console.log(e));
        deleteLinksByParentId(obj.id).then(() => console.log("deleted links")).catch(e => console.log(e));
        deleteDoc(doc(firestore, version + "-courses", obj.id));
    });
    //  delete branch by where branchid matches
    const querySnapshot2 = await getDocs(query(collection(firestore, version + "-branches"), where("branchId", "==", branchId)));
    querySnapshot2.forEach((obj) => {
        deleteDoc(doc(firestore, version + "-branches", obj.id));
    });
}

export const fetchSlots = async (registeredCourses) => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-slots"), where("courseCode", "in", registeredCourses)));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const addSlot = async (doc) => {
    const docRef = await addDoc(collection(firestore, version + "-slots"), doc);
    return { ...doc, id: docRef.id };
}

export const deleteSlotsByCourseId = async (courseId) => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-slots"), where("courseId", "==", courseId)));
    querySnapshot.forEach((obj) => {
        deleteDoc(doc(firestore, version + "-slots", obj.id));
    });
}

export const deleteSlotById = async (id) => {
    await deleteDoc(doc(firestore, version + "-slots", id));
}

export const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(firestore, version + "-courses"));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchCourseById = async (id) => {
    const docRef = await firestore.getDoc(doc(firestore, version + "-courses", id));
    return docRef.data();
}

export const deleteCourseById = async (id) => {
    await deleteSlotsByCourseId(id).then(() => console.log("deleted slots")).catch(e => console.log(e));
    await deleteLinksByParentId(id).then(() => console.log("deleted links")).catch(e => console.log(e));
    await deleteDoc(doc(firestore, version + "-courses", id));
}

export const addCourse = async (doc) => {
    const docRef = await addDoc(collection(firestore, version + "-courses"), doc);
    return { ...doc, id: docRef.id };
}

export const editCourse = async (id, obj) => {
    try {
        await setDoc(doc(firestore, version + "-courses", id), obj);
    }
    catch (e) {
        console.error("Error editing document: ", e);
    }
    return { ...obj, id };
}

export const fetchLinks = async (branchId) => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-links"), where("branchId", "==", branchId)));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const addLinks = async (arr) => {
    let docs = [];

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const docRef = await addDoc(collection(firestore, version + "-links"), element);
        docs.push({ ...element, id: docRef.id });
    }
    return docs;
}

export const deleteLinkById = async (id) => {
    await deleteDoc(doc(firestore, version + "-links", id));
}

export const deleteLinksByParentId = async (parentId) => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-links"), where("parentId", "==", parentId)));
    querySnapshot.forEach((obj) => {
        deleteDoc(doc(firestore, version + "-links", obj.id));
    });
}

export const fetchAllBranches = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-branches")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllCourses = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-courses")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllSlots = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-slots")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllLinks = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-links")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllData = async () => {
    const branches = await fetchAllBranches();
    const courses = await fetchAllCourses();
    const slots = await fetchAllSlots();
    const links = await fetchAllLinks();
    return { branches, courses, slots, links };
}

export const sendFeedback = async (doc) => {
    const docRef = await addDoc(collection(firestore, version + "-feedback"), doc);
    return { ...doc, id: docRef.id };
}

export const fetchFeedback = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, version + "-feedback")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const deleteFeedbackById = async (id) => {
    await deleteDoc(doc(firestore, version + "-feedback", id));
}
