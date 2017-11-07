import firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyAmVNCXJmvnN_0v12fYqwUwHJzgnE1zXb8',
  authDomain: 'yamzor-2.firebaseapp.com',
  databaseURL: 'https://yamzor-2.firebaseio.com',
  projectId: 'yamzor-2',
  storageBucket: 'yamzor-2.appspot.com',
  messagingSenderId: '1031419968194',
};


firebase.initializeApp(config);

export const db = firebase.database();
export const firebaseAuth = firebase.auth;
