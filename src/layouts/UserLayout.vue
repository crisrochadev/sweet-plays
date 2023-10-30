<template>
  <div class="w-screen h-screen overflow-hidden">
    <breadcrumbs></breadcrumbs>
    <router-view :key="$route.path" />

    <navigation-bottom-bar />
  </div>
</template>

<script>
import NavigationBottomBar from "@/components/user/NavigationBottomBar.vue";
import Breadcrumbs from "@/components/user/Breadcrumbs.vue";
import { useApi } from "@/store";
export default {
  components: { NavigationBottomBar, Breadcrumbs },
  data() {
    const store = useApi();
    return {
      store,
    };
  },
  mounted() {
    this.store.getUser();
  },
};
</script>

<style lang="scss" scoped></style>
