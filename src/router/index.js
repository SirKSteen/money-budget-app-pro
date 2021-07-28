import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Calculator from "../views/Calculator.vue";
import Login from "../views/Login.vue";
import Unauthorized from "../views/Unauthorized.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "Unauthorized",
    component: Unauthorized,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

import AuthServices from "../authentication/AuthenticationServices.vue";
let authMethods = AuthServices.methods;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authMethods.IsUserLoggedIn()) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
