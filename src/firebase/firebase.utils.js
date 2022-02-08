import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyATmydpa-0hH0zA8420Tuz9Jc2IZ42guaE",
  authDomain: "crwn-db-9f4e8.firebaseapp.com",
  projectId: "crwn-db-9f4e8",
  storageBucket: "crwn-db-9f4e8.appspot.com",
  messagingSenderId: "1051035164380",
  appId: "1:1051035164380:web:a8582691bd353ce22d5e19",
  measurementId: "G-83QRRDDG4C"
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();
  
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;