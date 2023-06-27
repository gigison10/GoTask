import { initializeApp, firebase } from "firebase/app";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  addDoc,
  query,
  orderBy,
  limit,
  FieldValue,
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

export const firestore = getFirestore();
//////////////////
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

///////////////////////////////////////////////

/////////////////////////////////////////////////
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
  // console.log(userSnapshot);
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

    try {
      // console.log(userId);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    projects = [];
    // console.log("no user logged in");
  }
});

export const updateProjects = async (e) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userId = user.uid;
      const userDocRef = doc(db, "users", userId);
      const projectsRef = collection(userDocRef, "projects");
      const projectDocRef = doc(projectsRef, e);
      try {
        const snapshot = await getDoc(projectDocRef); // Use getDoc instead of getDocs for a single document
        if (snapshot.exists()) {
          projects.push(snapshot.data());
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      projects = [];
    }
  });
};

//////////////////////////////////

const apiEndpoint =
  "https://firestore.googleapis.com/v1/projects/gotask-973a8/databases/(default)/documents/users/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => {
        console.log("get works");
        return `/${userId}/projects?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00`;
      },
      // serializeQueryArgs: ({ getTodos }) => {
      //   return getTodos;
      // },
      providesTags: [
        { type: "Todos", id: "onDetele" },
        { type: "Todos", id: "onLoad" },
      ],
      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      //   return currentCache;
      // },
    }),

    ////////////////////////////////////////////////////////
    addTodo: builder.mutation({
      query: async (todo) => {
        let projectData = {
          projectName: todo.projectName,
          deadLine: todo.deadLine,
          startingDate: todo.startingDate,
          createdAt: formattedDate,
        };
        const docRef = await addDoc(
          collection(db, `users/${userId}/projects`),
          projectData
        );

        const projectDataWithId = {
          ...projectData,
          projectId: docRef.id,
        };
        const projectDocRef = await doc(
          db,
          `users/${userId}/projects/${docRef.id}`
        );
        setDoc(projectDocRef, projectDataWithId);
      },
      invalidatesTags: [{ type: "Todos", id: "onLoad" }],
    }),

    /////////////////////////////////////////////
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation({
      query: (id) =>
        // console.log(id),
        ({
          url: `/${userId}/projects/${id}?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00`,
          method: "DELETE",
          // body: id,
        }),
      invalidatesTags: [{ type: "Todos", id: "onDetele" }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
