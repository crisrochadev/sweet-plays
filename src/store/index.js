import { defineStore } from "pinia";
import { database, fire, auth } from "@/boot/firebase";

export const useApi = defineStore("api", {
  state() {
    const db = database;
    return {
      db,
      data: [],
      auth,
      user: null,
    };
  },
  getters: {
    async get(state) {
      const ref = fire.dbRef(database);
      fire
        .get(fire.child(ref, `memory`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());

            this.data = snapshot.val();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return state.data;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    async login({ email, password }) {
      let error = null;
      let response = await fire
        .signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return { user: userCredential.user, success: true };
        })
        .catch((error) => {
          return { error: error.message, success: false };
        });

      if (error) {
        return response;
      }
      this.user = response.user;
      return response;
    },
    async login({ email, password }) {
      let error = null;
      let response = await fire
        .signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return { user: userCredential.user, success: true };
        })
        .catch((error) => {
          return { error: error.message, success: false };
        });

      if (error) {
        return response;
      }
      this.user = response.user;
      return response;
    },
    async register({ email, password }) {
      let error = null;
      let response = await fire
        .createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return { user: userCredential.user, success: true };
        })
        .catch((error) => {
          return { error: error.message, success: false };
        });

      if (error) {
        return response;
      }
      this.user = response.user;
      return response;
    },
  },
});
