import { defineStore } from "pinia";
import { database, fire, auth } from "@/services/firebase";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export const useApi = defineStore("api", {
  state() {
    const db = database;
    const router = useRouter();
    return {
      db,
      data: [],
      auth,
      user: null,
      router,
      players: [],
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
    async register({ email, password, username }) {
      let error = null;

      let response = await fire
        .createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return { user: userCredential.user, success: true };
        })
        .catch((error) => {
          return { error: error.message, success: false };
        });

      console.log(response);
      if (error) {
        return response;
      }
      if (response.user && response.user.uid) {
        this.user = response.user;
        let currentUser = {
          uid: response.user.uid,
          email: response.user.email,
          emailVerified: response.user.emailVerified,
          isAnonymous: response.user.isAnonymous,
          createdAt: "1698701605053",
        };
        console.log(currentUser);
        currentUser["username"] = username;
        const res = fire.set(
          fire.dbRef(database, "users/" + response.user.uid),
          currentUser
        );
        console.log(res);
      }
      return response;
    },
    async logout() {
      fire
        .signOut(auth)
        .then(() => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "usuário desconectado",
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              this.user = null;
              this.router.push({ name: "login" });
            },
          });
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Houve um erro ao tentar desconectar",
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              this.router.push({ name: "home" });
            },
          });
        });
    },
    async getUser() {
      this.user = auth.currentUser;
    },
    async getPlayers() {
      const getDB = fire.dbRef(database);
      const res = await fire
        .get(fire.child(getDB, `users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return {
              error: "No data available",
            };
          }
        })
        .catch((error) => {
          console.error(error);
        });

      if (!res.error) {
        this.players = res;
      }
    },
  },
});
