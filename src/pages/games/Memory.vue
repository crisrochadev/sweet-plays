<template>
  <div
    class="w-full h-[calc(100vh_-_200px)] flex flex-col"
    v-if="playType === null"
  >
    <div>
      <img src="/img/memory.svg" class="w-9/12 mx-auto" />
      <h2 class="text-center uppercase text-cyan-600 font-bold text-2xl m-0">
        Jogo da memoria
      </h2>
    </div>
    <div
      class="w-11/12 mx-auto flex flex-col justify-start gap-4 mt-4 items-center flex-1"
    >
      <button
        @click="playType = 'only'"
        class="w-full h-12 bg-cyan-600 flex justify-center items-center uppercase text-white font-bold rounded shadow-md focus:border-1 focus:border-cyan-100 hover:bg-cyan-900"
      >
        Jogar sozinho
      </button>
      <button
        class="w-full h-12 bg-cyan-600 flex justify-center items-center uppercase text-white font-bold rounded shadow-md focus:border-1 focus:border-cyan-100 hover:bg-cyan-900"
      >
        Jogar com computador
      </button>
      <button
      @click="playType = 'friend'"
        class="w-full h-12 bg-cyan-600 flex justify-center items-center uppercase text-white font-bold rounded shadow-md focus:border-1 focus:border-cyan-100 hover:bg-cyan-900"
      >
        Jogar com amigo
      </button>
    </div>
  </div>
  <router-view v-else />
</template>

<script>
export default {
  data() {
    return {
      playType: null,
    };
  },
  watch: {
    playType(newvalue) {
      if (newvalue === "only") {
        this.$router.push({ name: "only_memory" });
      }
      if (newvalue === "friend") {
        this.$router.push({ name: "friend_memory" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
