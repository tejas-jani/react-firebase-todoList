import firebase from 'firebase';

const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyAR7ckDcNLhCe9DgHFv3OPDIP7PePeBvWU",
    authDomain: "todo-app-tj-349c8.firebaseapp.com",
    projectId: "todo-app-tj-349c8",
    storageBucket: "todo-app-tj-349c8.appspot.com",
    messagingSenderId: "271166444898",
    appId: "1:271166444898:web:23657ba54b60fc7fdb083b",
    measurementId: "G-1HX4265F4C"
})
const db=firebase.firestore(); 

export default db;