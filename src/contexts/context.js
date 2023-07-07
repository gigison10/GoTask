import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  // createUserDocumentFromAuth,
} from "../utils/firebase/firebase-utils.js";

export const UserContext = createContext({
  currentUserId: null,
  setCurrentUserId: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const value = { currentUserId, setCurrentUserId };

  // const [count, setCount] = useState(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // createUserDocumentFromAuth(user);
        setCurrentUserId(user.uid);
      } else {
      }
      setCurrentUserId(user);
    });

    return unsubscribe;
  }, [currentUserId]);

  return (
    <UserContext.Provider value={{ ...value }}>{children}</UserContext.Provider>
  );
};
