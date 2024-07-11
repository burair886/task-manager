import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../view/login.vue"),
    },
    {
      path: "/tasks",
      component: () => import("../view/tasks.vue"),
    },
    {
      path: "/new-task",
      component: () => import("../view/taskForm.vue"),
    },
  ],
});

export default router;
