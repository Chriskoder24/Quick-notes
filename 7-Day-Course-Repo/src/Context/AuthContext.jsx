import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from "../firebaseconfig"; // <-- FIXED: Changed to ../ (assuming firebaseconfig is in src)

// REMOVED the unused 'User' import from lucide-react

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Optional helper to clear errors
    function clearError() {
        setError('');
    }

    async function signup(email, password) {
        setError('');
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    async function login(email, password) {
        setError('');
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    async function logout() {
        setError('');
        try {
            return await signOut(auth);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => { // <-- FIXED: Lowercase 'user'
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        logout,
        signup,
        login,
        error,
        loading,
        clearError // <-- Added optional helper
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}