import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../assets/firebase/firebase.config";

export const AuthContext = createContext();
// eslint-disable-next-line no-unused-vars
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsibscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('JWT Response', data);
                        // Warning: Local Storage is not the best (second best place) to store access token
                        localStorage.setItem('car-access-token', data.token);

                    })
            }
            else {
                localStorage.removeItem('car-access-token')
            }
        })
        return () => {
            return unsibscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;