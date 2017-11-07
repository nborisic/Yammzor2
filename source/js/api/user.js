import { db } from 'utils/firebase_config';

export function findUserByUID(uid) {
  return db.ref(`users/${ uid }`).once('value');
}

export function saveOrUpdateUser(uid, user) {
  return db.ref(`users/${ uid }`).set({
    role: user.role,
    username: user.username,
    email: user.email,
  });
}


// export function saveOrUpdateUser(uid, user) {
//   fetch(`https://yamzor-2.firebaseio.com/users/${ uid }`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       role: user.role,
//       username: user.username,
//       email: user.email,
//     }),
//   });
// }
