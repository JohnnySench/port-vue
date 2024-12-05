import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'jwt-auth-43434.firebaseapp.com',
  projectId: 'jwt-auth-43434',
  storageBucket: 'jwt-auth-43434.firebasestorage.app',
  messagingSenderId: '145544565822',
  appId: '1:145544565822:web:31370881086b189af12d6f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
