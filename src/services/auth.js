import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
export default async function authUser() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  });
}
