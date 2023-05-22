import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00",
  authDomain: "gotask-973a8.firebaseapp.com",
  projectId: "gotask-973a8",
  storageBucket: "gotask-973a8.appspot.com",
  messagingSenderId: "589835338400",
  appId: "1:589835338400:web:515ae6fc1315354658ffc5",
  measurementId: "G-CS2ZWLEKDP",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
let userId = "";

/////////////////////
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// console.log(auth);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// console.log(auth);

//////////////////////////////////////////////////

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
    return userDocRef;
  }
};

///////////////////////////////////////////////

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// const currentUserId = users.auth().currentUser.uid;
// console.log(currentUserId);

///////////// projects import export  ///////////////////
export let projects = [];

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const projectsRef = collection(userDocRef, "projects");
    // console.log("user logged in");
    // console.log(projects);

    try {
      const snapshot = await getDocs(projectsRef);
      snapshot.docs.forEach((doc) => {
        projects.push({
          ...doc.data(),
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  } else {
    projects = [];
    // console.log("no user logged in");
  }
});
// console.log(projects);
