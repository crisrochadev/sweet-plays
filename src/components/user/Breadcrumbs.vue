<template>
  <!-- Breadcrumb -->
  <nav
    class="flex justify-between px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Breadcrumb"
  >
    <li class="inline-flex items-center" v-if="$route.name !== 'play'">
      <button
        @click="$router.go(-1)"
        class="inline-flex mr-4 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        <span class="material-icons-outlined">arrow_back</span>
    </button>
    </li>
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <router-link
          :to="{ name: 'play', params: { uid: $route.params.uid } }"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        >
          Jogos
        </router-link>
      </li>
      <li v-if="$route.name !== 'play'">
        <div class="flex items-center">
          <svg
            class="w-3 h-3 mx-1 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <p
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ $route.meta.title }}
          </p>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [],
    };
  },
  mounted() {
    const routes = this.$router.getRoutes();
    routes.forEach((route, index) => {
      if (route.path.startsWith("/play")) {
        this.breadcrumbs.push({
          id: index++,
          name: route.name,
          title: route.meta.title,
          to: route.path.replace(":id", this.$route.params.uid),
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
