import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1EGilUU6bDwumGUhmYjBDkLtPpJeH7kg",
  authDomain: "warm-lamp-chat.firebaseapp.com",
  projectId: "warm-lamp-chat",
  storageBucket: "warm-lamp-chat.appspot.com",
  messagingSenderId: "143893608835",
  appId: "1:143893608835:web:aaff65d4f7b8a9e55fdeb6",
  measurementId: "G-THYWZF3H05"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [uid, setUID] = useState(null);

    useEffect(() => {
      if(uid !== null) {
        console.log('set snapshot');
        const docRef = doc(db, "users", uid);
        const unsubscribe = onSnapshot(docRef, (doc) => {
          const userData = doc.data();
          
          console.log("user data", userData);
          setUser({name:userData.name, photo:userData.photo, uid:userData.uid});
          console.log("user in store", user);
        },
          (error) => console.log('error')
          );
          return () => unsubscribe;
      }
      
    }, [uid])

    const initUser = async ({uid, name, photo}) => {
      console.log('init user');
      const docRef = doc(db, "users", uid);
      const userDB = await getDoc(docRef);
      if(!userDB.exists()) {
        await setDoc(docRef, {uid, name, photo});
        console.log('init user - user added');
        setUID(uid);
      } else {
        console.log('init user - user exists');
        setUID(uid);
      }
    }
    
    onAuthStateChanged(auth, (authUser) => {
      console.log('user auth ', authUser );
        if (authUser !== null) {
          initUser({uid:authUser.uid, name:authUser.displayName, photo:authUser.photoURL});
        } else {
          setUser(null);
        }
      });

    const LogOut = () => {
        signOut(auth);
        console.log("signout")
      };

    const LogIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }
    const UpdateChatName = async (newname) => {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: newname
      });
    }
    return (
        <UserContext.Provider
          value={{ user, LogIn, LogOut, UpdateChatName }}>
          {children}
        </UserContext.Provider>
    );
}


