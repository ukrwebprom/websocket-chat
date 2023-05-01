import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { nanoid } from 'nanoid'

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
      console.log('uid ', uid)
      const updState = (userData) => {
        setUser({name:userData.name, photo:userData.photo, uid:userData.uid, userID:nanoid()});
      }
      if(uid !== null) {
        const docRef = doc(db, "users", uid);
        const unsubscribe = onSnapshot(docRef, (doc) => {
          const userData = doc.data();
          updState(userData);
        },
          (error) => console.log('error')
          );
          return () => unsubscribe;
      }

    }, [uid])


    const initUser = async ({uid, name, photo}) => {
      const docRef = doc(db, "users", uid);
      const userDB = await getDoc(docRef);
      if(!userDB.exists()) {
        await setDoc(docRef, {uid, name, photo});
        setUID(uid);
      } else {
        setUID(uid);
      }
    }


    onAuthStateChanged(auth, (authUser) => {
          if (authUser !== null) {
          initUser({uid:authUser.uid, name:authUser.displayName, photo:authUser.photoURL});
        } else {
          setUser(null);
          setUID(null);
        }
      });

    const LogOut = () => {
        signOut(auth);
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
          value={{ user, LogIn, LogOut, UpdateChatName}}>{/*  //, setChatId, chat, chatUsers  */}
          {children}
        </UserContext.Provider>
    );
}


