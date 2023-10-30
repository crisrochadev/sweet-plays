<template>
  <!-- <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
    <button
      type="button"
      class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
    >
      All categories
    </button>
    <button
      type="button"
      class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
    >
      Shoes
    </button>
    <button
      type="button"
      class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
    >
      Bags
    </button>
    <button
      type="button"
      class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
    >
      Electronics
    </button>
    <button
      type="button"
      class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
    >
      Gaming
    </button>
  </div> -->
  <div class="pb-28 grid grid-cols-2 md:grid-cols-3 gap-4">
    <button
      v-for="game in games"
      :key="game.id"
      class="bg-cyan-600 rounded shadow-md p-2 relative transition-all hover:scale-110 hover:border-4 hover:border-white hover:bg-cyan-300 focus:scale-110 focus:border-4 focus:border-white focus:bg-cyan-300"
      @click="$router.push({ name: game.name })"
    >
      <img
        class="h-auto max-w-full rounded-lg"
        :src="`/img/${game.name}.svg`"
        alt=""
      />
      <p
        class="absolute bottom-0 left-0 flex justify-center items-center w-full h-10 text-white font-bold hover:bg-cyan-800 transition-colors delay-100 uppercase bg-[rgba(255,255,255,.25)]"
      >
        {{ game.title }}
      </p>
    </button>
  </div>
</template>

<script>
export default {
  props: ["games"],
};
</script>

<style lang="scss" scoped></style>
