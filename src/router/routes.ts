import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'game', component: () => import('pages/Game.vue') },
      {
        path: 'whole-reduct',
        component: () => import('pages/Whole_Reduct.vue'),
      },
      {
        path: 'learning-state',
        component: () => import('pages/LearningStatePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
