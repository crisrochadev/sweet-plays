<template>
  <div
    class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200  bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
      <button
        @click="$router.push({ name: 'play' })"
        data-tooltip-target="tooltip-home"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <img src="/img/icon_games.svg" />
        <span class="sr-only">Jogos</span>
      </button>
      <div
        id="tooltip-home"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Jogos
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button
        @click="$router.push({ name: 'players' })"
        data-tooltip-target="tooltip-wallet"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <img src="/img/icon_contact.svg" />
        <span class="sr-only">Jogadores</span>
      </button>
      <div
        id="tooltip-wallet"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Jogadores
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div class="flex items-center justify-center">
        <button
          @click="$router.push({ name: 'ranking' })"
          data-tooltip-target="tooltip-new"
          type="button"
          class="inline-flex items-center justify-center w-10 h-10 font-medium bg-cyan-600  hover:bg-cyan-700 group focus:ring-4 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
        >
          <img src="/img/icon_ranking.svg" />
          <span class="sr-only">Ranking</span>
        </button>
      </div>
      <div
        id="tooltip-new"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Ranking
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>

      <button
        data-tooltip-target="tooltip-profile"
        @click="$router.push({ name: 'settings' })"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <img src="/img/icon_settings.svg" />
        <span class="sr-only">Configurações</span>
      </button>
      <div
        id="tooltip-profile"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Configurações
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button
        @click="$router.push({ name: 'user_settings' })"
        data-tooltip-target="tooltip-settings"
        type="button"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <img v-if="user && user.photoURL" src="/img/icon_ranking.svg" />
        <p
          v-else
          class="font-extrabold text-cyan-600 text-4xl uppercase bg-cyan-200  w-8 h-8 pb-2 flex justify-center items-center"
        >
          {{ getNameUser(user) }}
        </p>
        <span class="sr-only">Ranking</span>
      </button>
      <div
        id="tooltip-settings"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900  shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Ranking
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useApi } from "@/store";
export default {
  data() {
    const store = useApi();
    return { store };
  },
  computed: {
    user() {
      return this.store.user;
    },
  },
  methods: {
    getNameUser(user) {
      let letters = "";
      if (user && user.displayName) {
        letters = user.displayName.substring(0, 1);
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
