// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCA7o--QcKXjfSMsMWRiaakF08Jk28Lfaw",
    authDomain: "testnull-edcb5.firebaseapp.com",
    projectId: "testnull-edcb5",
    storageBucket: "testnull-edcb5.firebasestorage.app",
    messagingSenderId: "179772710945",
    appId: "1:179772710945:web:8ff27a380b6199d17f8360"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Fonctions d'authentification ---

// Création de compte
export async function signUp(email, password) {
    /*return await createUserWithEmailAndPassword(auth, email, password);*/
}

// Connexion
export async function signIn(email, password) {
    // return await signInWithEmailAndPassword(auth, email, password);
}

// Déconnexion
export async function logOut() {
    return await signOut(auth);
}

// Récupération de l'objet auth pour écouter l'état d'authentification
export { auth };
