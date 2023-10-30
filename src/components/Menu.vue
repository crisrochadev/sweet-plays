<template>
  <div
    id="drawer-navigation"
    class="hidden md:block absolute top-0 left-0 z-40 w-64 h-full shadow-md p-4 overflow-y-auto transition-transform bg-white"
    tabindex="-1"
    :class="[
      open
        ? ''
        : $route.name === 'play'
        ? '-translate-x-[calc(100%_-_70px)]'
        : '-translate-x-[100%]',
    ]"
    aria-labelledby="drawer-navigation-label"
  >
    <h5
      id="drawer-navigation-label"
      class="text-base flex justify-end px-2 items-center font-semibold text-gray-500 uppercase"
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
            class="flex w-full items-center justify-start p-2 text-gray-900 rounded-lg hover:bg-gray-100 d group"
          >
            <span
              class="material-icons-outlined w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
            >
              {{ item.icon }}
            </span>
            <span class="ml-3" v-if="open">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="md:hidden block fixed bottom-0  left-0 z-40 w-screen h-12  overflow-y-auto transition-transform bg-white"
    tabindex="-1"
    style="box-shadow: 0 -2px 2px rgba(0,0,0,.25);"
    aria-labelledby="drawer-navigation-label"
  >
    <div class="oveflow-hidden w-full h-full ">
      <ul
        class="font-medium grid grid-cols-2 justify-around items-center h-full w-full"
      >
        <li v-for="item in menu" :key="item.id" class="flex items-center justify-center text-cyan-600 hover:text-white  hover;bg-cyan-600 w-full h-full">
          <a
            href="#"
           class="font-extrabold text-2xl"
          >
            <span
              class="material-icons-outlined w-5 h-5 text-cyan-600 hover:text-white font-extrabold transition duration-75 group-hover:text-gray-900"
            >
              {{ item.icon }}
            </span>
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
      menu: [
        {
          id: 1,
          title: "Configurações",
          path: "settings",
          icon: "settings",
        },
        {
          id: 1,
          title: "Ranking",
          path: "ranking",
          icon: "thumb_up",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
