import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
      const docRef = await setDoc(doc(db, "users", email), {
        favorites: [],
      });
      return createUserWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const updateUserDetails = useCallback(
    (userData) => {
      return updateProfile(auth.currentUser, userData);
    },
    [auth]
  );

  const logOut = useCallback(() => {
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error instanceof Error ? error.message : error);
      });
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, updateUserDetails, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
