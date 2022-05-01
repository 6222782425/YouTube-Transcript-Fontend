import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TranscriptView from "../views/TranscriptView.vue";
import TranscriptViewLibrary from "../views/TranscriptViewLibrary.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UserLibrary from "../views/UserLibrary.vue";
import UserDataService from "../services/UserDataService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/transcript",
    name: "TranscriptView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/TranscriptView.vue"),
    component: TranscriptView,
  },
  {
    path: "/transcriptViewLibrary",
    name: "TranscriptViewLibrary",
    component: TranscriptViewLibrary,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/userlibrary",
    name: "UserLibrary",
    component: UserLibrary,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

async function checkUserLoggedIn() {
  try {
    await UserDataService.getAll();
    return true;
  } catch {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  console.log("local token= " + localStorage.getItem("token"));
  const isLoggedIn = await checkUserLoggedIn();
  console.log(isLoggedIn);
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "SignIn" });
  } else {
    next();
  }
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
});

export default router;
