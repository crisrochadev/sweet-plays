<template>
  <div
    class="flex flex-col justify-between items-start w-full p-2 gap-2 h-[calc(100%_-_120px)]"
  >
    <div class="w-full">
      <h2 class="px-2 font-bold my-2">Notificações</h2>
      <ul
        class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li
          v-for="notification in notifications"
          :key="notification.key"
          class="w-full flex flex-col hover:bg-cyan-100 focus:bg-cyan-100 cursor-pointer justify-between items-start px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
        >
          <div class="text-xs flex gap-2 items-center">
            <p class="flex justify-start items-center gap-2">
              <span
                class="material-icons-outlined text-cyan-600"
                style="font-size: 12px !important"
                >calendar_month</span
              >
              <span class="text-[12px]">{{ notification.date }}</span>
            </p>
            <p class="flex justify-start items-center gap-2">
              <span
                class="material-icons-outlined text-cyan-600"
                style="font-size: 12px !important"
                >schedule</span
              >
              <span class="text-[12px]">{{ notification.time }}</span>
            </p>
          </div>
          <div class="my-2 flex flex-col justify-between items-start gap-1">
            <p class="uppercase font-bold text-cyan-600 text-xs">
              {{ notification.title }}
            </p>
            <p class="text-lg">{{ notification.body }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="w-full h-10 px-4 text-white bg-cyan-600 hover:bg-cyan-900 rounded shadow-md flex justify-start items-center gap-2"
      @click="store.logout"
    >
      <span class="material-icons-sharp">logout</span> sair
    </div>
  </div>
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
  computed: {
    notifications() {
      return this.store.notifications;
    },
  },
};
</script>

<style lang="scss" scoped></style>
