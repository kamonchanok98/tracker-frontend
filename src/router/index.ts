import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LineCallback from '../views/LineCallback.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/auth/line/callback',
    name: 'LineCallback',
    component: LineCallback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
