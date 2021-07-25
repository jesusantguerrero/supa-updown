import Dashboard from "./pages/Dashboard.vue"
import Login from "./pages/Login.vue"
import { createRouter, createWebHistory } from "vue-router";
import { supabaseState } from "./utils/useSupabase";
// import { isAuthenticated } from "./utils/useSupabase";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { 
    path: "/dashboard", 
    name: "dashboard",
    component: Dashboard,

  },
  {
    path: "/login",
    component: Login,
    name: "login",
    props: {
      mode: 'login'
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    component: Login,
    name: "register",
    props: {
      mode: 'register'
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: Login,
    name: "home",
    meta: {
      requiresAuth: false,
    },
  },
];

const myRouter = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

myRouter.beforeEach(async (to, from, next) => {
  const user = supabaseState.user;
  if (to.meta.requiresAuth !== false && !user) {
    next({name: "login"})
  } else if (to.meta.requiresAuth == false && user) {
    next({name: "dashboard"})
  }else {
    next();
  }
});

export default myRouter;
