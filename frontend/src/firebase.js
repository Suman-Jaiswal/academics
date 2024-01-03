import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBcVQ4oWW9ahzsp_m0qAJbjPsbwajSzquM",
    authDomain: "academics-caeab.firebaseapp.com",
    projectId: "academics-caeab",
    storageBucket: "academics-caeab.appspot.com",
    messagingSenderId: "193272940312",
    appId: "1:193272940312:web:a8456fb4d24eaeae71c06d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name);

const firestore = getFirestore(app);

export { firestore };