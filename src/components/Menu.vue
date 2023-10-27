<template>
  <div
    id="drawer-navigation"
    class="absolute top-0 left-0 z-40 w-64 h-full shadow-md p-4 overflow-y-auto transition-transform bg-white "
    tabindex="-1"
    :class="[open ? '' : '-translate-x-[calc(100%_-_70px)]']"
    aria-labelledby="drawer-navigation-label"
  >
    <h5
      id="drawer-navigation-label"
      class="text-base flex justify-end px-2 items-center font-semibold text-gray-500 uppercase "
    >
      <button
        type="button"
        @click="open = !open"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class=""
      >
        <span class="material-icons-outlined">{{
          open ? "close" : "menu"
        }}</span>
        <span class="sr-only">Close menu</span>
      </button>
    </h5>

    <div class="py-4 overflow-y-auto">
      <ul
        class="space-y-2 font-medium flex justify-center flex-col gap-2"
        :class="[open ? 'items-center ' : 'items-end']"
      >
        <li
          v-for="item in menu"
          :key="item.id"
          class="flex items-center gap-2"
          :class="[open ? 'w-full justify-start' : 'w-[40px] justify-end']"
        >
          <a
            href="#"
            class="flex w-full items-center justify-start p-2 text-gray-900 rounded-lg  hover:bg-gray-100 d group"
          >
            <span
              class="material-icons-outlined w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
            >
              {{ item.icon }}
            </span>
            <span class="ml-3" v-if="open">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      menu:[
        {
            id:1,
            title:"Configurações",
            path:"settings",
            icon:'settings'
        },
        {
            id:1,
            title:"Ranking",
            path:"ranking",
            icon:'thumb_up'
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped></style>
