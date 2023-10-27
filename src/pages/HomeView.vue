<template>
  <div></div>
</template>

<script>
import { useApi } from "@/store/index.js";

export default {
  data() {
    const store = useApi();
    return {
      store,
    };
  },
 async mounted() {
    console.log(this.store.db);
    const data = await this.store.get
    console.log(data);
  },
};
</script>

<style lang="scss" scoped></style>
