import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup, onAuthStateChanged} from "firebase/auth";

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
const user = auth.currentUser;
const googleProvider = new GoogleAuthProvider();


const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
/*     useEffect(() => {
        if(user !== null) localStorage.setItem('userToken', user.refreshToken);  
    }, [user]) */

    onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
        if (authUser) {
          //const uid = user.uid;
          
        } else {
        }
      });

    const LogOut = () => {
        signOut(auth);
        console.log("signout")
      };

    const LogIn = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <UserContext.Provider
          value={{ user, LogIn, LogOut }}>
          {children}
        </UserContext.Provider>
    );
}


