<template>
  <div
    class="w-full relative h-[calc(100vh_-_70px)] overflow-hidden flex justify-end items-start gap-4"
  >
    <Menu />
    <div class="w-[calc(100%_-_80px)] h-full overflow-y-auto">
      <nav class="flex" aria-label="Breadcrumb">
        <!-- <div @click="$router.go(-1)" class="w-10 h-10 flex justify-center items-center cursor-pointer hover:text-cyan-400">
          <span class="material-icons-sharp">arrow_back</span>
        </div> -->
        <div
          class="inline-flex items-center space-x-1 md:space-x-3"
          v-for="(item, index) in breadcrumbs"
          :key="item.id"
        >
          <div class="inline-flex items-center">
            <div
              @click="
                () => {
                  if (index < breadcrumbs.length - 1) {
                    $router.push({ name: item.path });
                  }
                }
              "
              :class="[index < breadcrumbs.length - 1 ? 'hover:text-cyan-600' : '']"
              class="ml-2 inline-flex items-center text-sm font-medium cursor-pointer text-gray-700  teste:text-gray-400 teste:hover:text-white"
            >
              {{ item.name }}
            </div>
          </div>
          <span
            v-if="index < breadcrumbs.length - 1"
            class=" text-gray-700 inline-block mr-4"
            >| </span
          >
        </div>
      </nav>

      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  components: { Menu },
  computed: {
    breadcrumbs() {
      let list = this.$route.path.split("/");
      let routes = this.$router.getRoutes();

      let crumbs = [];
      list.forEach((item, index) => {
        let bread = routes.find((r) => r.name === item);
        console.log(bread);
        if (bread) {
          crumbs.push({
            id: index + 1,
            name: bread.meta.title,
            path: bread.name,
          });
        }
      });

      console.log(crumbs);
      return crumbs;
    },
  },
};
</script>

<style lang="scss" scoped></style>
