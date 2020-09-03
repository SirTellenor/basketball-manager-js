import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../pages/index.vue";
import Squad from "../pages/squad.vue";
import Calendar from "../pages/calendar.vue";
import Market from "../pages/market.vue";
import Settings from "../pages/settings.vue";
import League from "../pages/league.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/squad",
    name: "Squad",
    component: Squad
  },
  {
    path: "/market",
    name: "Market",
    component: Market
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/league",
    name: "League",
    component: League
  }
];

const router = new VueRouter({
  routes
});

export default router;
