<template>
  <section
    class="h-[calc(100vh_-_70px)] w-full overflow-hidden overflow-y-auto"
  >
    <div class="container h-full px-6 py-24">
      <div
        class="g-6 grid md:grid-cols-2 h-full flex-wrap items-center justify-center lg:justify-between"
      >
        <!-- Left column container with background-->
        <div class="mb-12 w-full relative z-50 bg-white md:h-full">
          <img src="/img/hero.svg" class="w-full" alt="Phone image" />
        </div>

        <!-- Right column container with form -->
        <div class="w-full h-[270px] flex justify-center items-center relative">
          <transition name="fade">
            <LoginComponent
              key="1"
              v-show="isLogin"
              v-model:loading="loading"
              v-model:isLogin="isLogin"
              v-model:error="error"
              @login="login"
              :msg="msg"
            />
          </transition>
          <transition name="fade2">
            <RegisterComponent
              key="2"
              v-show="!isLogin"
              @register="register"
              v-model:loading="loading"
              v-model:isLogin="isLogin"
              v-model:error="error"
              :msg="msg"
            />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useApi } from "@/store/index.js";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

export default {
  components: { LoginComponent, RegisterComponent },
  data() {
    const store = useApi();
    return {
      store,
      loading: false,
      msg: null,
      error: false,
      isLogin: true,
    };
  },
  methods: {
    async login(e) {
      this.loading = true;
      const loginData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const res = await this.store.login(loginData);
      console.log(res);
      if (!res.success) {
        this.error = true;
        this.msg = res.error.includes("auth/invalid-login-credentials")
          ? "Usuário não cadastrado"
          : "";
      } else {
        this.$router.push({ name: "games" });
      }
      setTimeout(() => {
        this.error = false;
      }, 3000);
      this.loading = false;
    },
    async register(e) {
      this.loading = true;
      const loginData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      if (e.target.password.value !== e.target.cpassword.value) {
        this.error = true;
        this.msg = "As senhas não são iguais";
      } else if (e.target.password.value.length <= 6) {
        this.error = true;
        this.msg = "Sua senha precisa ter mais de 6 caracteres";
      } else {
        const res = await this.store.register(loginData);
        console.log(res);
        if (!res.success) {
          this.error = true;
          this.msg = res.error.includes("auth/invalid-login-credentials")
            ? "Usuário não cadastrado"
            : "";
        } else {
          this.$router.push({ name: "games" });
        }
      }
      setTimeout(() => {
        this.error = false;
      }, 3000);
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.fade2-enter-active,
.fade2-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-to {
  left: 0;
}
.fade-enter-from {
  left: -100%;
}
.fade-leave-to {
  left: -100%;
}
.fade-leave-from {
  left: 0;
}
.fade2-enter-to {
  right: 0;
}
.fade2-enter-from {
  right: -100%;
}
.fade2-leave-to {
  right: -100%;
}
.fade2-leave-from {
  right: 0;
}
</style>
