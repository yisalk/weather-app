import { createWebHistory, createRouter } from "vue-router";
import WeatherComponent from "./components/Weather.vue";

const routes = [
  {
    name: '/',
    path: '/',
    redirect: '/weather'
  },
  {
    name: 'Weather',
    path: '/weather/:city?',
    component: WeatherComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;