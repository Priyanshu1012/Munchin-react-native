import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAgjhvBU4rXZwdAJRHatn5EX73UaY3KwsI',
    authDomain: 'myproject-5a427.firebaseapp.com',
    databaseURL: 'https://myproject-5a427-default-rtdb.firebaseio.com',
    projectId: 'myproject-5a427',
    storageBucket: 'myproject-5a427.appspot.com',
    messagingSenderId: '1025860493751',
    appId: '1:1025860493751:android:7acc6ed884b211f4018832',
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const firebaseAuth = firebaseApp.auth();