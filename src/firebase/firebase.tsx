import { initializeApp, } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, unlink } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCVusnKvRPHEL2Tg4kkrTcjM5rRel0cGek",
    authDomain: "ionicreactapp-cd56e.firebaseapp.com",
    projectId: "ionicreactapp-cd56e",
    storageBucket: "ionicreactapp-cd56e.firebasestorage.app",
    messagingSenderId: "645499698413",
    appId: "1:645499698413:web:d28e10117af92e4d9ee0e4"
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Register a new user
export const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Erro ao registrar user' + error.message)
        } else {
            throw new Error("Erro desconhecido ao registrar usuário")
        }
    }
}

//Function to login with email and password:
export const loginWithEmailAndPassword = async (email: string, password: string) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Erro ao logar' + error.message)
        } else {
            throw new Error("Erro desconhecido ao logar usuário")
        }
    }
}

//verificar estado de autenticação
export const checkAuthState = (callback:(user: any) => void) => {
    onAuthStateChanged(auth, callback)
}