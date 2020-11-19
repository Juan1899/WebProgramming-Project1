// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCyDn1HNaEm4YMHnpjJ-cGanFiGlv0TGOY",
    authDomain: "web-valorant-store.firebaseapp.com",
    databaseURL: "https://web-valorant-store.firebaseio.com",
    projectId: "web-valorant-store",
    storageBucket: "web-valorant-store.appspot.com",
    messagingSenderId: "243188745025",
    appId: "1:243188745025:web:dbbfd0fd06b1f6d93257c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); 
const usersRef = db.collection('users');
const productsRef = db.collection('products');
const storageRef = firebase.storage().ref(); 
const ordersRef = db.collection('orders');