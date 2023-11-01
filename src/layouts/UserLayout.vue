<template>
  <div
    class="w-screen h-screen overflow-hidden bg-white dark:bg-gray-800 dark:text-white"
  >
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
    console.log(this.$messaging);
    // this.$messaging.getToken({vapidKey:'ZqZOEhXnQSFHV0lnUWL-0WKMgXKBaE3_8Kg48JxAmIw'});

    this.store.getTokenMessaging();
    this.store.listenNotifications();
  },
};
</script>

<style lang="scss" scoped></style>
