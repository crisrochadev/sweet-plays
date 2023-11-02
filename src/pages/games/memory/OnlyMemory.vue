<template>
  <div class="w-full h-[calc(100vh_-_250px)]">
    <div class="flex w-full">
      <div
        class="flex w-full uppercase font-bold gap-2 justify-between items-center p-2"
      >
        <p class="flex items-center gap-2">
          <img class="w-8 h-8" src="/img/icon_coin.svg" />
          <span class="text-cyan-600 font-extrabold text-2xl">{{
            points
          }}</span>
        </p>
        <p class="flex items-center gap-2">
            <img class="w-8 h-8" :src="getImage()" />
          <span
            v-if="position > 3"
            class="text-cyan-600 font-extrabold text-2xl dark:text-cyan-100"
            >{{ position }}</span
          >
        </p>
        <p class="flex items-center gap-2">
          <img class="w-8 h-8" src="/img/icon_ranking.svg" />
          <span class="text-cyan-600 font-extrabold text-2xl">{{ one }}</span>
        </p>
        <p class="flex items-center gap-2">
          <img class="w-8 h-8" src="/img/icon_chart.svg" />
          <span class="text-cyan-600 font-extrabold text-2xl">{{
            highestScore
          }}</span>
        </p>
        <p class="flex items-center gap-2">
          <img class="w-8 h-8" src="/img/icon_round.svg" />
          <span class="text-cyan-600 font-extrabold text-2xl">{{
            choices
          }}</span>
        </p>
      </div>
    </div>
    <div class="w-full grid gap-1 justify-center items-start p-2 box h-full">
      <button
        v-for="item in items"
        :key="item.id"
        :disable="clickable"
        @click="
          () => {
            if (!showing.some((i) => i.id === item.id) && clickable) {
              showImage(item);
            }
          }
        "
        class="flex justify-center items-center flip-card w-full h-full"
        :class="[showing.some((i) => i.id === item.id) ? 'show' : '']"
      >
        <div
          class="flip-card-inner w-full h-full flex justify-center items-center"
        >
          <div
            class="text-6xl flip-card-front w-full h-full absolute cursor-pointer flex justify-center items-center rounded shadow-md bg-cyan-300"
          ></div>
          <div
            class="text-6xl flip-card-back w-full h-full absolute cursor-pointer flex justify-center items-center rounded shadow-md bg-cyan-300"
            style="font-family: 'Noto Color Emoji', sans-serif"
          >
            {{ item.char }}
          </div>
        </div>
      </button>
    </div>
    <div
      v-if="win"
      class="w-full h-full fixed bg-[rgba(255,255,255,.25)] top-0 left-0 z-50 flex justify-center items-center"
    >
      <div class="p-8 bg-white shadow-md rounded">
        <h2 class="uppercase font-bold text-cyan-600 mb-8 text-3xl">
          Parabens!
        </h2>
        <p class="">Você ainda tem</p>

        <p class="">{{ choices }}</p>
        <p class="">chances</p>
        <div class="w-full flex justify-center items-center mt-8">
          <button
            @click="win = false"
            class="bg-cyan-600 text-white uppercase p-2 rounded shadow-md hover:bg-cyan-800 cursor-pointer"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="los"
      class="w-full h-full fixed bg-[rgba(255,255,255,.25)] top-0 left-0 z-50 flex justify-center items-center"
    >
      <div class="p-8 bg-white shadow-md rounded">
        <h2 class="uppercase font-bold text-red-600 mb-8 text-3xl">
          Que pena!
        </h2>
        <p class="">Você perdeu</p>
        <div class="w-full flex justify-center items-center mt-8">
          <button
            @click="los = false"
            class="bg-red-600 text-white uppercase p-2 rounded shadow-md hover:bg-red-800 cursor-pointer"
          >
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icons from "@/assets/icons";
import useCarrinho from "@/composables/carrinho";
import useErro from "@/composables/erro";
import useSucesso from "@/composables/sucesso";
import { useApi } from "@/store";

export default {
  data() {
    const play = useCarrinho();
    const erro = useErro();
    const sucesso = useSucesso();
    const store = useApi();
    // const { play:sucesso } = useSound(sucesso);
    return {
      next: 4,
      store,
      play,
      erro,
      sucesso,
      win: false,
      los: false,
      previous: 0,
      currIcons: icons,
      showing: [],
      completeIcons: [],
      cols: 4,
      par: [],
      items: [],
      clickable: true,
    };
  },
  computed: {
    memories: {
      get() {
        console.log(this.store.memories);
        return this.store.memories;
      },
      set(newvalue) {
        this.store.memories = newvalue;
      },
    },
    ranking() {
      console.log(this.memories)
      return this.memories.sort((a, b) => b.score - a.score);
    },
    position() {
      console.log(this.memories.sort((a, b) => b.score - a.score));
      console.log(this.userId);
      return (
        this.ranking.findIndex((player) => player.uid === this.store.userId) + 1
      );
    },
    one() {
      console.log(this.ranking[0]);
      return this.ranking[0] ? this.ranking[0].score : 0;
    },
    tam() {
      return (window.screen.height - 150) / this.cols;
    },
    points: {
      get() {
        return this.store.memory.score;
      },
      set(newvalue) {
        this.store.memory.score = newvalue;
        this.store.setMemoryValue();
      },
    },
    choices: {
      get() {
        return this.store.memory.choices;
      },
      set(newvalue) {
        this.store.memory.choices = newvalue;
        this.store.setMemoryValue();
      },
    },
    rounds: {
      get() {
        return this.store.memory.rounds;
      },
      set(newvalue) {
        this.store.memory.rounds = newvalue;
        this.store.setMemoryValue();
      },
    },
    highestScore: {
      get() {
        return this.store.memory.highestScore;
      },
      set(newvalue) {
        this.store.memory.highestScore = newvalue;
        this.store.setMemoryValue();
      },
    },
  },
  mounted() {
    this.store.getMemory();
    this.store.getAllMemories();
    this.mountItems();
  },
  methods: {
    mountItems() {
      let rows = Math.floor((window.screen.height - 150) / this.tam);

      let icons = this.shuffleArray(this.currIcons).filter(
        (icon, index) =>
          index > this.previous && index <= (this.next * rows) / 2
      );
      let items = [];
      icons.forEach((item, index) => {
        items.push({
          ...item,
          id: index + 1,
        });
        items.push({
          ...item,
          id: icons.length + index + 1,
        });
      });
      this.items = this.shuffleArray(items);
    },
    showImage(char) {
      this.play();
      this.clickable = false;
      setTimeout(() => (this.clickable = true), 600);
      if (this.choices !== 0) {
        if (!this.showing.includes(char)) {
          this.showing.push(char);
          this.par.push(char);
        }

        this.checkWinner1(char);
      } else {
        this.loose();
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    checkWinner1() {
      if (this.par.length === 2) {
        if (this.par[0].char === this.par[1].char) {
          this.completeIcons.push(this.showing[0].char);
          this.completeIcons.push(this.showing[1].char);
          this.checkComplete();
          this.par = [];
          this.points++;
          if (this.points > this.highestScore) {
            this.highestScore = this.points;
          }
        } else {
          this.erro();
          this.choices--;
          setTimeout(() => {
            this.showing = this.showing.filter(
              (s) => s.char !== this.par[1].char && s.char !== this.par[0].char
            );
            this.par = [];
          }, 600);
        }
      }
    },
    loose() {
      this.points = 0;
      this.par = [];
      this.showing = [];
      this.completeIcons = [];
      this.mountItems();
      this.choices = 48;
      this.rounds++;
      this.erro();
      this.los = true;
    },
    checkComplete() {
      if (this.completeIcons.length === this.items.length) {
        setTimeout(() => {
          this.sucesso();
          this.par = [];
          this.showing = [];
          this.completeIcons = [];
          this.mountItems();
          this.choices = this.choices + 2;
          this.win = true;
          this.rounds++;
        }, 600);
      }
    },
    getImage() {
      if (this.position === 1) return "/img/icon_podium_1.svg";
      else if (this.position === 2) return "/img/icon_podium_2.svg";
      else if (this.position === 3) return "/img/icon_podium_3.svg";
      else return "/img/icon_podium.svg";
    },
  },
};
</script>

<style scoped>
.box {
  grid-template-columns: repeat(v-bind(cols), 1fr);
}
.flip-card {
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.show .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
