import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
export default async function authUser() {
  const res = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          success: true,
          uid: user.uid,
        });
      } else {
        resolve({
          success: false,
        });
      }
    });
  });

  return await res;
}
