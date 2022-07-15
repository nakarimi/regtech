import { createWebHistory, createRouter } from "vue-router";
 
// import App from './App.vue'
   
const routes = [
  {
    name: 'home',
    path: '',
    component: () => import("./components/Home.vue"),
  },
  {
    name: 'Create',
    path: '/create',
    component: () => import("./components/metadata/AddMetadata.vue"),
  },
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;