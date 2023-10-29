<template>
  <div class="w-full h-[calc(100vh_-_150px)]">
    <div>Pontuações e afins</div>
    <div class="w-full grid gap-1 justify-center items-start p-2 box h-full">
      <button
        v-for="item in items"
        :key="item.id"
        @click="
          () => {
            if (!showing.some((i) => i.id === item.id)) {
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
  </div>
</template>

<script>
import icons from "@/assets/icons";
import useCarrinho from "@/composables/carrinho";
import useErro from "@/composables/erro";
import useSucesso from "@/composables/sucesso";

export default {
  data() {
    const play = useCarrinho();
    const erro = useErro();
    const sucesso = useSucesso();
    // const { play:sucesso } = useSound(sucesso);
    return {
      next: 4,
      play,
      erro,
      sucesso,
      previous: 0,
      currIcons: icons,
      showing: [],
      completeIcons: [],
      cols: 4,
      par: [],
    };
  },
  computed: {
    tam() {
      return (window.screen.height - 150) / this.cols;
    },
    items: {
      get() {
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
        return this.shuffleArray(items);
      },
      set(newvalue) {
        this.currIcons = newvalue;
      },
    },
  },
  methods: {
    showImage(char) {
      this.play();
      if (!this.showing.includes(char)) {
        this.showing.push(char);
        this.par.push(char);
      }

      this.checkWinner1(char);
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
        } else {
          this.erro();
          setTimeout(() => {
            this.showing = this.showing.filter(
              (s) => s.char !== this.par[1].char && s.char !== this.par[0].char
            );
            this.par = [];
          }, 600);
        }
      }
    },
    checkComplete() {
      if (this.completeIcons.length === this.items.length) {
        setTimeout(() => {
          this.sucesso();
          this.par = [];
          this.showing = [];
          this.completeIcons = [];
          this.curraIcons = icons;
          
          alert("Voce venceu!");
        }, 600);
      }
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
