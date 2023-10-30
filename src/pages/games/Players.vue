<template>
  <div class="w-full h-[calc(100vh_-_70px)] relative p-2">
    <div class="relative overflow-hidden h-full shadow-md sm:rounded-lg">
      <div class="flex items-center justify-center mt-2 pb-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span class="material-icons-outlined">search</span>
          </div>
          <input
            type="text"
            id="table-search"
            class="block p-2 pl-10 text-sm text-cyan-900 border border-cyan-300 rounded-lg w-80 bg-cyan-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-cyan-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar Jogadores"
          />
        </div>
      </div>

      <div
        class="w-[98%] mx-auto max-w-[600px] h-10 flex justify-center items-center mb-2"
      >
        <button
          @click="tab = 'add'"
          class="flex-1 border border-cyan-600 flex justify-center items-center h-full uppercase font-bold"
          :class="[
            tab === 'add' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-600',
          ]"
          style="border-radius: 5px 0 0 5px"
        >
          <p>Adicionados</p>
        </button>
        <button
          @click="tab = 'all'"
          class="flex-1 border border-cyan-600 flex justify-center items-center h-full uppercase font-bold"
          :class="[
            tab === 'all' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-600',
          ]"
          style="border-radius: 0 5px 5px 0"
        >
          <p>Todos</p>
        </button>
      </div>

      <div
        class="w-[98%] flex flex-col justify-start items-center mx-auto overflow-y-auto pb-32 h-full"
      >
        <div
          v-for="player in players"
          :key="player"
          class="w-full h-14 border p-2 rounded-md bg-white text-blue-600 grid justify-start items-center my-2"
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
            class="w-full overflow-hidden px-4 text-cyan-900 uppercase font-bold flex justify-start items-center"
          >
            @ <span>{{ player.username ? player.username : "" }}</span>
          </div>
          <div class="w-full flex justify-center items-center">
            <button
              class="rounded-full p-1 text-cyan-600 font-extra-bold cursor-pointer transition-colors delay-100 hover:text-cyan-900 focus:border-2 focus:border-blue-400"
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
import icon from "@/assets/icon_invite.svg";
export default {
  data() {
    const store = useApi();
    return {
      store,
      icon,
      tab: "all",
    };
  },
  mounted() {
    this.store.getPlayers();
  },
  computed: {
    players() {
      if (this.tab === "all") {
        return this.store.players;
      } else {
        return [];
      }
    },
  },
  methods: {
    getNameUser(user) {
      let letters = "";
      if (user && user.username) {
        letters = user.username.substring(0, 1);
        if (user.split(" ")[1]) {
          letters = letters + user.split(" ")[1].substring(0, 1);
        }
      } else if (user) {
        letters = user.email.substring(0, 1);
      } else {
        letters = "";
      }
      return letters;
    },
  },
};
</script>

<style lang="scss" scoped></style>
