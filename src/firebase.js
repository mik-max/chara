import {initializeApp} from "firebase/app";
import React, {useEffect, useState} from "react";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
const app =  initializeApp({
     apiKey: "AIzaSyCKo_kStjfJZIs5Kv-VsPcSQfPsjtmG4WI",
     authDomain: "messenger-clone-31b16.firebaseapp.com",
     projectId: "messenger-clone-31b16",
     storageBucket: "messenger-clone-31b16.appspot.com",
     messagingSenderId: "888366868749",
     appId: "1:888366868749:web:965f0007b003ea7576a844"
}) 

const db = getFirestore();
export default db;
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export function signIn(theProvider){
     return signInWithPopup(auth, theProvider)
}
export function logOut(){
     return signOut(auth);
}
// custom Hook
export function useAuth(){
     useEffect(() => {
         const unsub = onAuthStateChanged(auth, user => {setCurrentUser(user);})
         return unsub;
     }, [])
     const[currentUser, setCurrentUser] = useState();
     return currentUser;
}
export {auth, provider}