import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  onAuthStateChanged,
  projects,
} from "../utils/firebase/firebase-utils.js";
//as the actual value that i want to acces

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const ProjectsContext = createContext({
  currentProject: null,
  setCurrentProject: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  const [currentProject, setCurrentProject] = useState(projects);
  const projectsValue = { currentProject, setCurrentProject };

  useEffect(() => {
    // console.log("context useEffect");

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        setCurrentProject(projects);
      } else {
        setCurrentProject([]);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <ProjectsContext.Provider value={projectsValue}>
      <UserContext.Provider value={{ ...value }}>
        {children}
      </UserContext.Provider>
    </ProjectsContext.Provider>
  );
};
