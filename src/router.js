import Landing from "./pages/Landing/index.vue";
import Login from "./pages/Auth/Login.vue";
import Dashboard from "./pages/Dashboard.vue";
import Settings from "./pages/Settings/index.vue";
import Notifications from "./pages/Notifications.vue";
import PageBoard from "./pages/PageBoard.vue"
import IncidentsCreate from "./pages/incidents/Create.vue"
import IncidentsView from "./pages/incidents/View.vue"
import Status from "./pages/Status.vue"
import { createRouter, createWebHistory } from "vue-router";
import config from "./config";
import { useAuth } from "@utils/lumiere";

export const routes = [
  {
    path: "/",
    component: Landing,
    name: "landing",
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    props: {
      mode: "login",
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
      mode: "register",
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notifications,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
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
    path: "/status/:page", 
    name: "status",
    component: Status,
    meta: {
      requiresAuth: false,
    },
  },
];

const myRouter = createRouter({
  history: createWebHistory(),
  routes,
});
const { isAuthenticated } = useAuth();
myRouter.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
  if (to.meta.requiresAuth !== false && !user) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth == false && user && config.loginRoutes.includes(to.name)) {
    next({ name: config.home });
  } else {
    next();
  }
});

export const avoidLoginRoutes = (route, isAuthenticated) => {
  if (isAuthenticated && route.matched.some(record => config.loginRoutes.includes(record.path))) {
    myRouter.push({ name: "dashboard" });
  } else if (!isAuthenticated) {
    myRouter.push({ name: "login" });
  }
  return
}

export default myRouter;
