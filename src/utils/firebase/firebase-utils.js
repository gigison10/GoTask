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

//////////////////////////////
export const auth = getAuth();
export const db = getFirestore();
/////////////////////////////////

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//////////////////////////////////////////////////
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    localStorage.setItem("userId", user.uid);
    try {
      // console.log(userId);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    // console.log("no suer");
    localStorage.removeItem("userId");
    // console.log("no user logged in");
  }
});

/////////////////////////////////////////////
const apiEndpoint =
  "https://firestore.googleapis.com/v1/projects/gotask-973a8/databases/(default)/documents/users/";
///////////////////////////////////////////////////////////////////

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => {
        // console.log("get works", userId);
        return `${localStorage.getItem(
          "userId"
        )}/projects?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00`;
      },
      // serializeQueryArgs: ({ getTodos }) => {
      //   return getTodos;
      // },
<<<<<<< HEAD
      // staleTime: 500, // disable caching
=======
      // staleTime: 500, // disable cachings
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
      providesTags: [
        { type: "Todos", id: "onDetele" },
        { type: "Todos", id: "onLoad" },
        { type: "Todos", id: "onUpdate" },
      ],
      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      //   return currentCache;
      // },
    }),

    ///////////////////////////////////////////////////////

    addTodo: builder.mutation({
      query: async (todo) => {
        let projectData = {
          projectName: todo.projectName,
          deadLine: todo.deadLine,
          startingDate: todo.startingDate,
        };
        const docRef = await addDoc(
          collection(db, `users/${localStorage.getItem("userId")}/projects`),
          projectData
        );
<<<<<<< HEAD
=======

>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
        const projectDataWithId = {
          ...projectData,
          projectId: docRef.id,
        };
        const projectDocRef = await doc(
          db,
          `users/${localStorage.getItem("userId")}/projects/${docRef.id}`
        );
        setDoc(projectDocRef, projectDataWithId);
      },
      invalidatesTags: [{ type: "Todos", id: "onLoad" }],
    }),

    /////////////////////////////////////////////

<<<<<<< HEAD
    getTasks: builder.query({
      async queryFn() {
        const userId = localStorage.getItem("userId");
        const userProjectsRef = collection(db, "users", userId, "projects");
        const userProjectsSnapshot = await getDocs(userProjectsRef);

        const tasks = [];

        for (const projectDoc of userProjectsSnapshot.docs) {
          const projectId = projectDoc.id;
          const tasksRef = collection(
            db,
            "users",
            userId,
            "projects",
            projectId,
            "tasks"
          );
          const tasksSnapshot = await getDocs(tasksRef);

          tasksSnapshot.forEach((taskDoc) => {
            tasks.push(taskDoc.data());
          });
        }

        return {
          data: tasks,
        };
      },

      providesTags: [
        // { type: "Todos", id: "onDetele" },
        // { type: "Todos", id: "onLoad" },
        // { type: "Todos", id: "onUpdate" },
      ],
    }),

    /////////////////////////////////////////////

    addTask: builder.mutation({
      query: async (task) => {
        let taskData = {
          taskName: task.taskName,
          taskDescription: task.taskDescription,
          taskprojectId: task.projectId,
        };
        const docRef = await addDoc(
          collection(
            db,
            `users/${localStorage.getItem("userId")}/projects/${
              task.projectId
            }/tasks`
          ),
          taskData
        );

        const taskDataWithId = {
          ...taskData,
          taskId: docRef.id,
        };
        const taskDocRef = await doc(
          db,
          `users/${localStorage.getItem("userId")}/projects/${
            task.projectId
          }/tasks/${docRef.id}`
        );
        setDoc(taskDocRef, taskDataWithId);
      },
      invalidatesTags: [{ type: "Task", id: "onLoad" }],
    }),

    /////////////////////////////////////////////

    updateTodo: builder.mutation({
      query: ({ id, projectName, deadLine, startingDate }) =>
        // console.log("update work"),
        ({
=======
    updateTodo: builder.mutation({
      query: ({ id, projectName, deadLine, startingDate }) => (
        console.log("update work"),
        {
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
          url: `/${localStorage.getItem(
            "userId"
          )}/projects/${id}?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00`,
          method: "PATCH",
          body: {
            fields: {
              projectName: { stringValue: projectName },
              deadLine: { stringValue: deadLine },
              startingDate: { stringValue: startingDate },
              projectId: { stringValue: id },
            },
          },
<<<<<<< HEAD
        }),
=======
        }
      ),
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
      invalidatesTags: [{ type: "Todos", id: "onUpdate" }],
    }),

    /////////////////////////////////////////////////

    deleteTodo: builder.mutation({
      query: (id) =>
        // console.log(id),
        ({
          url: `/${localStorage.getItem(
            "userId"
          )}/projects/${id}?key=AIzaSyDg0a3RsAo0iIaAJzwTjd7vHvGLWXqzZ00`,
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
<<<<<<< HEAD
  useGetTasksQuery,
  useAddTaskMutation,
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
