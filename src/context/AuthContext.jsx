import { createContext, useCallback, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const signIn = useCallback(
    (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const signUp = useCallback(
    async (email, password) => {
      const docRef = await addDoc(collection(db, "users"), {
        favorites: [],
      });
      return createUserWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const logOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log("signed out");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
