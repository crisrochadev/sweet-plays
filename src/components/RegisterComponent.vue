<template>
  <div
    class="md:mt-0 mt-4 absolute w-full h-full flex flex-col justify-center items-center bg-white"
  >
    <form @submit.prevent="(e) => $emit('register', e)" class="w-11/12">
      <h2
        class="mb-4 uppercase text-cyan-600 font-bold text-center lg:text-2xl text-md"
      >
        Cadastrar para jogar
      </h2>
      <!-- Email input -->
      <div class="relative mb-6" data-te-input-wrapper-init>
        <input
          type="email"
          name="email"
          class="focus:outline-none w-full h-14 bg-transparent border-2 border-cyan-500 rounded p-2 placeholder:text-cyan-500"
          id="exampleFormControlInput3"
          placeholder="Email"
        />
      </div>

      <!-- Password input -->
      <div
        class="relative mb-6 border-2 border-cyan-500 rounded flex justify-between items-center"
        data-te-input-wrapper-init
      >
        <input
          :type="typePass ? 'password' : 'text'"
          name="password"
          class="focus:outline-none w-full h-14 bg-transparent px-2 placeholder:text-cyan-500"
          id="exampleFormControlInput33"
          placeholder="Password"
        />
        <span
          @click="typePass = !typePass"
          class="material-icons-outlined block mx-2 cursor-pointer text-cyan-600"
          >{{ typePass ? "visibility" : "visibility_off" }}</span
        >
      </div>
      <div
        class="relative mb-6 border-2 border-cyan-500 rounded flex justify-between items-center"
        data-te-input-wrapper-init
      >
        <input
          :type="typePass ? 'password' : 'text'"
          name="cpassword"
          class="focus:outline-none w-full h-14 bg-transparent px-2 placeholder:text-cyan-500"
          id="cexampleFormControlInput33"
          placeholder="Confirme a Senha"
        />
        <span
          @click="typePass = !typePass"
          class="material-icons-outlined block mx-2 cursor-pointer text-cyan-600"
          >{{ typePass ? "visibility" : "visibility_off" }}</span
        >
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        class="flex justify-center items-center w-full rounded bg-cyan-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] teste:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] teste:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] teste:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] teste:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <svg
          v-if="loading"
          aria-hidden="true"
          class="w-6 h-6 mr-2 text-gray-800 animate-spin teste:text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span v-else>Cadastrar</span>
      </button>
    </form>
    <Transition>
      <div
        v-if="err"
        id="toast-warning"
        class="absolute top-2 left-2 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow teste:text-gray-400 teste:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg teste:bg-orange-700 teste:text-orange-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
            />
          </svg>
          <span class="sr-only">Warning icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">
          {{ msg }}
        </div>
        <button
          type="button"
          @click="error = false"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 teste:text-gray-500 teste:hover:text-white teste:bg-gray-800 teste:hover:bg-gray-700"
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </Transition>
    <div @click="login = true" class="w-11/12 text-left mt-4 text-gray-800">
      Já tem cadastro ?
      <span class="text-cyan-600 hover:text-cyan-800 font-bold cursor-pointer"
        >Entre</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["error", "msg", "isLogin", "loading"],
  emits: ["update:error", "update:isLogin", "register", "update:loading"],
  data() {
    return {
      typePass: true,
    };
  },
  computed: {
    err: {
      get() {
        return this.error;
      },
      set(newvalue) {
        this.$emit("update:error", newvalue);
      },
    },
    login: {
      get() {
        return this.isLogin;
      },
      set(newvalue) {
        this.$emit("update:isLogin", newvalue);
      },
    },
    load: {
      get() {
        return this.loading;
      },
      set(newvalue) {
        this.$emit("update:loading", newvalue);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
