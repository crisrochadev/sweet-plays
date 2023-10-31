import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import authUser from "@/services/auth";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: HomeView,
      },
      {
        path: "login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../pages/Login.vue"),
      },
    ],
  },

  {
    path: "/play/:uid",
    name: "games",
    meta: {
      title: "Jogos",
    },
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "",
        meta: { title: "Jogos" },
        name: "play",
        component: () => import("../pages/games/Index.vue"),
      },
      {
        path: "user",
        meta: { title: "Configurações da Conta" },
        name: "user_settings",
        component: () => import("../pages/games/UserSetting.vue"),
      },
      {
        path: "ranking",
        meta: { title: "Ranking" },
        name: "ranking",
        component: () => import("../pages/games/Ranking.vue"),
      },
      {
        path: "settings",
        meta: { title: "Configurações" },
        name: "settings",
        component: () => import("../pages/games/Settings.vue"),
      },
      {
        path: "players",
        meta: { title: "Jogadores" },
        name: "players",
        component: () => import("../pages/games/Players.vue"),
      },
      {
        path: "memory",
        name: "memory",
        meta: { title: "Jogo da memória" },
        component: () => import("../pages/games/Memory.vue"),
        children: [
          {
            path: "only-memory",
            meta: { title: "Jogar Sozinho" },
            name: "only_memory",
            component: () => import("../pages/games/memory/OnlyMemory.vue"),
          },
          {
            path: "friend-memory",
            meta: { title: "Jogar Sozinho" },
            name: "friend_memory",
            component: () => import("../pages/games/memory/FriendMemory.vue"),
          },
        ],
      },
      {
        path: "old",
        name: "old",
        meta: { title: "Jogo da velha" },
        component: () => import("../pages/games/Old.vue"),
      },
      {
        path: "tetris",
        name: "tetris",
        meta: { title: "Tetris" },
        component: () => import("../pages/games/Tetris.vue"),
      },
      {
        path: "nave",
        name: "nave",
        meta: { title: "Jogo da nave" },
        component: () => import("../pages/games/Nave.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const user = await authUser();
  if (to.name === "games") {
    return { name: "home" };
  } else if (!user.success && to.name !== "login" && to.name !== "home") {
    return { name: "login" };
  }
});
export default router;
