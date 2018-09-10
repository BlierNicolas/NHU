import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyDN76_Af2ZvRy8KHQLd9XbhusfWkLV5Adg",
  authDomain: "venatusuniverse-1f10d.firebaseapp.com",
  databaseURL: "https://venatusuniverse-1f10d.firebaseio.com",
  projectId: "venatusuniverse-1f10d",
  storageBucket: "venatusuniverse-1f10d.appspot.com",
  messagingSenderId: "948799971419",
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
//provider.getCredential(null, null);

export const auth = firebase.auth();

export default firebase;