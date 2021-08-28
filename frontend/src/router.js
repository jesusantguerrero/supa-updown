import Dashboard from "./pages/Dashboard.vue"
import PageBoard from "./pages/PageBoard.vue"
import IncidentsCreate from "./pages/incidents/Create.vue"
import IncidentsView from "./pages/incidents/View.vue"
import Account from "./pages/account/UserAccount.vue"
import Status from "./pages/Status.vue"
import Login from "./pages/auth/Login.vue"
import { createRouter, createWebHistory } from "vue-router";
import {  useSupabase } from "./utils/useSupabase";

const routes = [
  { 
    path: "/dashboard", 
    name: "dashboard",
    component: Dashboard,
  },
  { 
    path: "/pages/create", 
    name: "create-page",
    component: PageBoard,
  },
  { 
    path: "/incidents/create", 
    name: "create-incident",
    component: IncidentsCreate,
  },
  { 
    path: "/incidents/:id", 
    name: "view-incident",
    component: IncidentsView,
    meta: {
      requiresAuth: false,
    },
  },
  { 
    path: "/updates/create", 
    name: "create-update",
    component: IncidentsCreate,
  },
  {
    path: "/pages/:id/edit",
    name: 'page',
    component: PageBoard,
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

const loginRoutes = ['/login', '/register', '/'];

myRouter.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
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



export const avoidLoginRoutes = (route, isAuthenticated) => {
  if (isAuthenticated && route.matched.some(record => loginRoutes.includes(record.path))) {
    myRouter.push({ name: "dashboard" });
  } else if (!isAuthenticated) {
    myRouter.push({ name: "login" });
  }
  return
}

export default myRouter;
