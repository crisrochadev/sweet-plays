<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 p-4 gap-4 w-full">
    <div
      v-for="game in games"
      :key="game.id"
      class="max-w-sm p-2 flex flex-col justify-between bg-white shadow-md rounded-lg teste:bg-gray-800 teste:border-gray-700"
    >
      <div>
        <img
          class="rounded-t-lg"
          :src="`/img/${game.name}.svg`"
          :alt="game.title"
        />
      </div>
      <div class="p-5">
        <h5
          class="mb-2 text-md md:text-lg lg:text-2xl tracking-tight text-cyan-600 teste:text-white uppercase font-extrabold"
        >
          {{ game.title }}
        </h5>
        <router-link
          :to="{ name: game.name }"
          class="w-full justify-center uppecase font-bold flex items-center px-3 py-2 text-sm text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 teste:bg-cyan-600 teste:hover:bg-cyan-700 teste:focus:ring-cyan-800"
        >
          Jogar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: [
        {
          id: 1,
          title: "Jogo da memória",
          name: "memory",
        },
        {
          id: 2,
          title: "Jogo da velha",
          name: "old",
        },
        {
          id: 3,
          title: "Tetris",
          name: "tetris",
        },
        {
          id: 4,
          title: "Jogo da nave",
          name: "nave",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
