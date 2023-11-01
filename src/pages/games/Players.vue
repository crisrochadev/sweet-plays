<template>
  <div class="w-full h-[calc(100vh_-_70px)] relative p-2">
    <div class="relative overflow-hidden h-full shadow-md sm:rounded-lg">
      <div
        class="w-[98%] mx-auto max-w-[600px] h-8 flex justify-center items-center mb-2"
      >
        <button
          @click="tab = 'add'"
          class="flex-1 border-b-2 flex justify-center items-center h-full uppercase"
          :class="[
            tab === 'add'
              ? ' border-cyan-600 text-cyan-600 font-bold'
              : ' border-gray-600 text-gray-700',
          ]"
        >
          <p>Adicionados</p>
        </button>
        <button
          @click="tab = 'all'"
          class="flex-1 border-b-2 flex justify-center items-center h-full uppercase"
          :class="[
            tab === 'all'
              ? ' border-cyan-600 text-cyan-600 font-bold'
              : ' border-gray-600 text-gray-700',
          ]"
        >
          <p>Todos</p>
        </button>
      </div>
      <div
        v-if="!apiIsReady"
        class="w-full h-full flex justify-center items-center top-0 left-0"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div
        v-else
        class="w-[98%] flex flex-col justify-start items-center mx-auto overflow-y-auto pb-32 h-full"
      >
        <div
          v-for="player in players"
          :key="player"
          tabindex="-1"
          class="border-b border-cyan-100 w-full h-10 hover:bg-gray-50 focus:bg-gray-50 bg-white text-blue-600 grid justify-start items-center"
          style="grid-template-columns: 40px 1fr 40px"
        >
          <div class="w-full h-10">
            <img
              class="w-10 h-10"
              v-if="player.photoURL"
              :src="player.photoURL"
            />
            <p
              class="uppercase font-extrabold h-full hw-full flex justify-center items-center text-2xl"
              v-else
            >
              {{ getNameUser(player) }}
            </p>
          </div>
          <div
            class="w-full overflow-hidden px-4 text-cyan-700 uppercase font-bold flex justify-start items-center"
          >
            @ <span>{{ player.username ? player.username : "" }}</span>
          </div>
          <div class="w-full flex justify-center items-center">
            <button
              v-if="player.invitedes && player.invitedes[store.userId]"
              :id="`add_${player.uid}`"
              @click="
                notify.message(
                  'Este usuário já foi convidado',
                  `add_${player.uid}`
                )
              "
              class="p-1 text-cyan-600 font-extra-bold cursor-pointer transition-colors delay-100 hover:text-cyan-900 focus:text-cyan-900"
            >
              <span class="material-icons-sharp">done</span>
            </button>
            <button
              v-else
              @click="addPlayer(player)"
              class="p-1 text-cyan-600 font-extra-bold cursor-pointer transition-colors delay-100 hover:text-cyan-900 focus:text-cyan-900"
            >
              <span class="material-icons-sharp">group_add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useApi } from "@/store";
import { useNotify } from "@/composables/useNotify";

import icon from "@/assets/icon_invite.svg";
import axios from "axios";
export default {
  data() {
    const store = useApi();
    const notify = useNotify();
    return {
      store,
      icon,
      tab: "all",
      apiIsReady: false,
      notify,
    };
  },
  async mounted() {
    this.store.getPlayers();
    this.apiIsReady = true;
  },
  computed: {
    players: {
      get() {
        if (this.tab === "all") {
          console.log(this.store.players);
          return this.store.players.filter(
            (player) => !player.players || !player.players[this.store.userId]
          );
        } else {
          return this.store.players.filter(
            (player) => player.players && player.players[this.store.userId]
          );
        }
      },
      set(newvalue) {
        this.store.players = newvalue;
      },
    },
  },
  methods: {
    getNameUser(user) {
      let letters = "";
      if (user && user.username) {
        letters = user.username.substring(0, 1);
        if (user.username.split(" ")[1]) {
          letters = letters + user.split(" ")[1].substring(0, 1);
        }
      } else if (user) {
        letters = user.email.substring(0, 1);
      } else {
        letters = "";
      }
      return letters;
    },
    async addPlayer(player) {
      if (this.store.user) {
        const notification = {
          title: "convite",
          body: "O usuário " + player.username + " te enviou um convite!",
          command: {
            type: "add_user",
            data: player.uid,
          },
        };
        const res = this.store.sendMessage(notification, player.uid);

        if (res) {
          this.notify.positiveConfirm(
            "Enviamos uma notificação para " +
              player.username +
              ", assim que confirmado, será adicionado a sua lista de jogadores."
          );
          const res = await this.store.updateData(
            "users",
            player.uid,
            "invitedes/" + this.store.userId,
            true
          );
          if (res) {
            this.store.getPlayers();
          }
        } else {
          this.notify.negativeConfirm(
            "Não foi possivel adicionar o usuário, por favor entre em contato com o suporte na aba suporte."
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
