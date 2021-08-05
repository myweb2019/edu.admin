import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/login/login.vue'
import Index from '../pages/home/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: (_) => {
            return { path: '/login' }
        },
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/index',
        component: Index
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;