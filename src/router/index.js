import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login.vue"),
  },
  {
    path: "/play",
    name: "games",
    meta: {
      title: "Jogos",
    },
    component: () => import("../pages/Games.vue"),
    children: [
      {
        path: "",
        meta: { title: "Jogos" },
        name: "play",
        component: () => import("../pages/games/Index.vue"),
      },
      {
        path: "memory",
        name: "memory",
        meta: { title: "Jogo da memória" },
        component: () => import("../pages/games/Memory.vue"),
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

export default router;
