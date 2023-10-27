<template>
  <div class="w-full h-12 flex justify-between items-center px-4">
    <div class="flex-1 h-full relative flex justify-start items-center gap-4">
      <img
        src="/img/logo.svg"
        alt="Sweet Plays"
        title="Sweet Plays"
        class="w-6 h-10 object-fill"
      />
      <h2 class="uppercase font-extrabold text-cyan-600 md:text-lg">
        Sweet Plays
      </h2>
    </div>
    <div
      class="menu flex justify-end items-center gap-2"
      v-if="!$route.path.includes('play')"
    >
      <router-link to="/">Home</router-link>
      <router-link to="/login">Entrar</router-link>
    </div>
    <div
      class="menu relative flex flex-col justify-end items-center gap-2 text-cyan-600 hover:text-cyan-800 cursor-pointer"
      v-else
    >
      <button
        @click="openMenu = !openMenu"
        class="text-cyan-700 gap-2 hover:text-cyan-800 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        type="button"
      >
        <span class="material-icons-outlined">person</span>
        <span class="uppercase">Nome do usuario</span>
      </button>

      <!-- Dropdown menu -->
      <Transition name="menu_user">
        <div
          v-if="openMenu"
          class="z-10 absolute top-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div class="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Dashboard</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Earnings</a
              >
            </li>
          </ul>
          <div class="py-2">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Sign out</a
            >
          </div>
        </div>
      </Transition>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      openMenu: false,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu a {
  font-weight: bold;
  color: #424242;
}

.menu a.router-link-exact-active {
  color: #0891b2;
}

.menu_user-enter-active,
.menu_user-leave-active {
  transition: all 0.2s ease;
}

.menu_user-enter-to {
  top: 35px;
}
.menu_user-enter-from {
  top: 22px;
}
.menu_user-leave-to {
  top: 22px;
}
.menu_user-leave-from {
  top: 35px;
}
</style>
