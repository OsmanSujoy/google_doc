// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3yXyD-UqU8YPQlNujgMam3uncIrBypXg',
  authDomain: 'fir-15286.firebaseapp.com',
  projectId: 'fir-15286',
  storageBucket: 'fir-15286.appspot.com',
  messagingSenderId: '444574407595',
  appId: '1:444574407595:web:ce490f18c770b4c587d0ee',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
