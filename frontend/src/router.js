import Dashboard from "./pages/Dashboard.vue"
import Account from "./pages/UserAccount.vue"
import Status from "./pages/Status.vue"
import Login from "./pages/Login.vue"
import { createRouter, createWebHistory } from "vue-router";
import { supabaseState, useSupabase } from "./utils/useSupabase";
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
    path: "/account", 
    name: "account",
    component: Account,
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
    path: "/status/:page", 
    name: "status",
    component: Status,
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

const { isAuthenticated } = useSupabase();

myRouter.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
  const loginRoutes = ['/login', '/register'];
  const isPublicRoute = to.matched.some( record => record.meta.requiresAuth === false );
  const isLoginRoute = to.matched.some(record => loginRoutes.includes(record.path))
  if (!isPublicRoute && !user) {
    next({name: "login"})
  } else if (isPublicRoute && user && isLoginRoute) {
    next({name: "dashboard"})
  } else {
    next();
  }
});

export default myRouter;
