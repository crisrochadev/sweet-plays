import { defineStore } from "pinia";
import { database, fire, auth, messaging } from "@/services/firebase";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import memory from "./memory";
import { useStorage } from "@vueuse/core";
import moment from "moment";
import { useNotify } from "@/composables/useNotify";

export const useApi = defineStore("api", {
  state() {
    const db = database;
    const router = useRouter();
    const notify = useNotify();
    return {
      db,
      data: [],
      auth,
      user: null,
      router,
      players: [],
      userId: useStorage("@uid", null),
      memory: useStorage("@memory", {}),
      memories: [],
      accessUserToken: useStorage("@token", null),
      notifications: [],
      username: useStorage("@username", null),
      isConected: useStorage("@sweet-plays-isConected", false),
      notify,
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

    async login({ email, password, conected }) {
      let error = null;
      let response = await fire
        .signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return { user: userCredential.user, success: true };
        })
        .catch((error) => {
          return { error: error.message, success: false };
        });

      if (response.error) {
        this.notify.negative(response.error);
        return response;
      }
      if (response.user && response.user.uid) {
        this.user = response.user;
        this.userId = response.user.uid;
        this.accessUserToken = response.user.accessToken;
        this.isConected = conected;
        const user = await this.getDataBy("users", response.user.uid);
        this.username = user.username;
      }

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

      if (response.error) {
        this.notify.negative(response.error);
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
        this.userId = response.user.uid;
        this.username = username;
      }
      return response;
    },
    async logout() {
      fire
        .signOut(auth)
        .then(() => {
          this.isConected = false;
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
    async getDataBy(table, key) {
      const getDB = fire.dbRef(database);
      return new Promise((resolve) => {
        fire
          .get(fire.child(getDB, table + "/" + key))
          .then((snapshot) => {
            console.log(snapshot.val());
            if (snapshot.exists()) {
              resolve(snapshot.val());
            } else {
              resolve({ err: true });
            }
          })
          .catch((err) => resolve({ err }));
      });
    },
    getPlayers() {
      const getDB = fire.dbRef(database);
      fire
        .get(fire.child(getDB, `users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            Object.entries(snapshot.val()).forEach(([key, value]) => {
              const data = {
                uid: key,
                ...value,
              };
              if (!this.players.some((player) => player.uid === data.uid)) {
                this.players.push(data);
              } else {
                const index = this.players.findIndex(
                  (player) => player.uid === data.uid
                );
                this.players[index] = data;
              }
            });
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
    },
    getToken() {
      console.log("get token");
      fire
        .getToken(messaging, {
          vapidKey:
            "BMjMYZhE6p-gXHRyFzHX5T-iNUSGjuQtRFF_NhLzZDFxpdOZ07mAvFp6AnV-RGcZPkCa-C2h_3HMoatN6KTUdNo",
        })
        .then((currentToken) => {
          if (currentToken) {
            const updates = {
              ["/users/" + this.userId + "/messagingToken"]: currentToken,
            };

            fire.update(fire.dbRef(database), updates);

            // fire.set(fire.dbRef(database, "users/" + this.userId), newuser);
            // console.log("CURRENT TOKEN->      ", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    },
    getTokenMessaging() {
      if ("Notification" in window) {
        // Verificar se as permissões de notificação já foram concedidas
        if (Notification.permission !== "granted") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              this.getToken();
            }
          });
        } else {
          this.getToken();
        }
      }
    },
    async sendMessage(message, playerUid) {
      return await new Promise((resolve) => {
        const updates = {
          ["/notifications/" +
          playerUid +
          "/" +
          moment(Date.now()).format("DD-MM-YYYYTHH-MM-SS-ssss")]: message,
        };

        fire
          .update(fire.dbRef(database), updates)
          .then((res) => {
            resolve(true);
          })
          .then((erro) => {
            resolve(false);
          });
      });
    },
    async updateData(table, playerUid, key, value) {
      return await new Promise((resolve) => {
        const updates = {
          ["/" + table + "/" + playerUid + "/" + key]: value,
        };

        fire
          .update(fire.dbRef(database), updates)
          .then((res) => {
            resolve(true);
          })
          .then((erro) => {
            resolve(false);
          });
      });
    },
    listenNotifications() {
      const starCountRef = fire.dbRef(
        database,
        "/notifications/" + this.userId
      );
      fire.onValue(starCountRef, (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          let data = {};
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            const time = key.replace(/-/g, "/").split("T")[1].split("/");
            time.pop();
            data = {
              key,
              date: key.replace(/-/g, "/").split("T")[0],
              time: time.join(":"),
              ...value,
            };
            console.log(data);
            if (!this.notifications.some((m) => m.key === data.key)) {
              this.notifications.push(data);
            } else {
              const index = this.notifications.findIndex(
                (m) => m.key === data.key
              );
              this.notifications[index] = data;
            }
          });
        }
      });
      console.log(this.notifications);
    },
    ...memory,
  },
});
