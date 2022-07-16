import { createWebHistory, createRouter } from "vue-router";

// import App from './App.vue'

const routes = [
  {
    name: "home",
    path: "",
    component: () => import("./components/Home.vue"),
  },
  {
    name: "metadata",
    path: "/metadata",
    children: [
      {
        name: "Create Metadata",
        path: "create",
        component: () => import("./components/metadata/AddMetadata.vue"),
      },
      {
        name: "List Metadata",
        path: "list",
        component: () => import("./components/metadata/MetadataList.vue"),
      },
      {
        name: "Edit Metadata",
        path: "edit/:id",
        component: () => import("./components/metadata/EditMetadata.vue"),
      },
      {
        name: "History Metadata",
        path: "history/:id",
        component: () => import("./components/metadata/MetaDataHistory.vue"),
      },
    ],
  },
  {
    name: "techdata",
    path: "/techdata",
    children: [
      {
        name: "Create Technical Data",
        path: "create",
        component: () =>
          import("./components/technical_data/AddTechnicalData.vue"),
      },
      {
        name: "List Technical Data",
        path: "list",
        component: () =>
          import("./components/technical_data/TechnicalData.vue"),
      },
      {
        name: "Edit Technical Data",
        path: "edit/:id",
        component: () =>
          import("./components/technical_data/EditTechnicalData.vue"),
      },
      {
        name: "History Technical Data",
        path: "history/:id",
        component: () => import("./components/technical_data/TechnicalDataHistory.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
