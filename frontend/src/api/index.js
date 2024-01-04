import { firestore } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";

// // import axios from "axios";

// const api = process.env.REACT_APP_API

// // branch api
// export const fetchBranches = () => axios.get(api + '/branches');
// export const addBranch = (doc) => axios.post(api + '/branches', doc);
// export const deleteBranch = (id) => axios.delete(api + '/branches/' + id);

// // slot api
// export const fetchSlots = (branchId) => axios.get(api + '/slots', { params: { branchId } })
// export const addSlot = (doc) => axios.post(api + '/slots', doc)
// export const deleteSlotsByCourseId = (courseId) => axios.post(api + '/slots/delete', { courseId })
// export const deleteSlotById = (id) => axios.delete(api + '/slots/' + id)

// //course api
// export const fetchCourses = (branchId) => axios.get(api + '/courses', { params: { branchId } })
// export const fetchCourseById = (id) => axios.get(api + '/courses/' + id)
// export const deleteCourseById = (id) => axios.delete(api + '/courses/' + id)
// export const addCourse = (doc) => axios.post(api + '/courses', doc)
// export const editCourse = (id, doc) => axios.post(api + '/courses/' + id, doc)

// // link api
// export const fetchLinks = (branchId) => axios.get(api + '/links', { params: { branchId } })
// export const addLinks = (arr) => axios.post(api + '/links', { arr })
// export const deleteLinkById = (id) => axios.delete(api + '/links/' + id)
// export const deleteLinksByParentId = (parentId) => axios.post(api + '/links/delete', { parentId })



export const fetchBranches = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "branches")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const addBranch = async (doc) => {
    const docRef = await addDoc(collection(firestore, "branches"), doc);
    return { ...doc, id: docRef.id };
}

export const deleteBranch = async (id) => {
    await deleteDoc(doc(firestore, "branches", id));
}

export const fetchSlots = async (branchId) => {
    const querySnapshot = await getDocs(query(collection(firestore, "slots"), where("branchId", "==", branchId)));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const addSlot = async (doc) => {
    const docRef = await addDoc(collection(firestore, "slots"), doc);
    return { ...doc, id: docRef.id };
}

export const deleteSlotsByCourseId = async (courseId) => {
    const querySnapshot = await getDocs(query(collection(firestore, "slots"), where("courseId", "==", courseId)));
    querySnapshot.forEach((obj) => {
        deleteDoc(doc(firestore, "slots", obj.id));
    });
}

export const deleteSlotById = async (id) => {
    await deleteDoc(doc(firestore, "slots", id));
}

export const fetchCourses = async (branchId) => {
    const querySnapshot = await getDocs(query(collection(firestore, "courses"), where("branchId", "==", branchId)));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchCourseById = async (id) => {
    const docRef = await firestore.getDoc(doc(firestore, "courses", id));
    return docRef.data();
}

export const deleteCourseById = async (id) => {
    await deleteSlotsByCourseId(id).then(() => console.log("deleted slots")).catch(e => console.log(e));
    await deleteLinksByParentId(id).then(() => console.log("deleted links")).catch(e => console.log(e));
    await deleteDoc(doc(firestore, "courses", id));
}

export const addCourse = async (doc) => {
    const docRef = await addDoc(collection(firestore, "courses"), doc);
    return { ...doc, id: docRef.id };
}

export const editCourse = async (id, doc) => {
    await setDoc(doc(firestore, "courses", id), doc);
    return { ...doc, id };
}

export const fetchLinks = async (branchId) => {
    const querySnapshot = await getDocs(query(collection(firestore, "links"), where("branchId", "==", branchId)));
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
        const docRef = await addDoc(collection(firestore, "links"), element);
        docs.push({ ...element, id: docRef.id });
    }

    console.log(docs);
    return docs;
}

export const deleteLinkById = async (id) => {
    await deleteDoc(doc(firestore, "links", id));
}

export const deleteLinksByParentId = async (parentId) => {
    const querySnapshot = await getDocs(query(collection(firestore, "links"), where("parentId", "==", parentId)));
    querySnapshot.forEach((obj) => {
        deleteDoc(doc(firestore, "links", obj.id));
    });
}

export const fetchAllBranches = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "branches")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllCourses = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "courses")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllSlots = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "slots")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const fetchAllLinks = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "links")));
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
    const docRef = await addDoc(collection(firestore, "feedback"), doc);
    return { ...doc, id: docRef.id };
}

export const fetchFeedback = async () => {
    const querySnapshot = await getDocs(query(collection(firestore, "feedback")));
    let docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
}

export const deleteFeedbackById = async (id) => {
    await deleteDoc(doc(firestore, "feedback", id));
}
