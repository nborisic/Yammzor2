import { firebaseAuth } from 'utils/firebase_config';

export function getGoogleProvider() {
  return new firebaseAuth.GoogleAuthProvider();
}

export function firebaseLogOut() {
  return firebaseAuth().signOut();
}

export function firebaseCurrentUser() {
  return firebaseAuth().currentUser;
}

export function getIdToken() {
  return firebaseAuth().currentUser.getIdToken(true);
}
