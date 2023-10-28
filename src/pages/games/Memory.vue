<template>
  <div class="w-full h-[calc(100vh_-_115px)]">
    <div>Pontuações e afins</div>
    <div class="w-full flex flex-wrap gap-4 justify-start items-start p-4">
      <button
        v-for="item in items"
        :key="item.id"
        @click="showImage(item.char)"
        class="flex justify-center items-center flip-card"
        :class="[showing.includes(item.char) ? 'show' : '']"
        :style="`width:${tam};height:${tam}`"
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

export default {
  data() {
    return {
      next: 4,
      previous: 0,
      currIcons: icons,
      showing: [],
    };
  },
  computed: {
    items: {
      get() {
        let icons = this.currIcons
          .filter((icon, index) => index > this.previous && index <= this.next)
          .map((i) => ({ ...i, show: false }))
        return [...icons,...icons];
      },
      set(newvalue) {
        this.currIcons = newvalue;
      },
    },
    tam() {
      return '100px';
    },
  },
  methods: {
    showImage(char) {
      if (!this.showing.includes(char)) {
        this.showing.push(char);
      }
      
    },
  },
};
</script>

<style scoped>
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
