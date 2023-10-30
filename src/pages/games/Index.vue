<template>
  <div class="w-full p-2 h-full overflow-y-auto ">
    <games-grid :games="games"/>
  </div>
</template>

<script>
import GamesGrid from "@/components/user/GamesGrid.vue";
export default {
  components: { GamesGrid },
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
