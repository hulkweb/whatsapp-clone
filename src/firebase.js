// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC1XkcNM-RQFIPNaNZ6CB2bQ4Fu8ycEJRI",
    authDomain: "hulkweb-whatsapp-clone.firebaseapp.com",
    projectId: "hulkweb-whatsapp-clone",
    storageBucket: "hulkweb-whatsapp-clone.appspot.com",
    messagingSenderId: "743234930405",
    appId: "1:743234930405:web:7209ebea64dea9634a760c",
    measurementId: "G-P9THC0QDVD"
  };

  const firebaseapp =firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth ,provider };
  export default db;