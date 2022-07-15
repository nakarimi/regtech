import { createWebHistory, createRouter } from "vue-router";
 
// import App from './App.vue'
   
const routes = [
  {
    name: 'home',
    path: '',
    component: () => import("./components/Home.vue"),
  },
  {
    name: 'metadata',
    path: '/metadata',
    children: [
      {
        name: 'Create',
        path: 'create',
        component: () => import("./components/metadata/AddMetadata.vue"),
      },
      {
        name: 'List',
        path: 'list',
        component: () => import("./components/metadata/MetadataList.vue"),
      },      {
        name: 'Edit',
        path: 'edit/:id',
        component: () => import("./components/metadata/EditMetadata.vue"),
      },
    ]
  },
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;