import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const  Login = () => import(/* webpackChunkName: "Login" */ '../pages/login/login.vue');
const  Home = () => import(/* webpackChunkName: "Home" */ '../pages/home/index.vue');
const  Index = () => import(/* webpackChunkName: "Index" */ '../pages/index/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: (_) => {
            return { path: '/login' }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/index',
        component: Home,
        children: [
            {
                path: '/index',
                component: Index
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
    // 获取token, 判断是否有token
    const token = localStorage.getItem('ACCESS_TOKEN')
    if (to.path == '/login' && token) next('/index');
    else if (to.path !== '/login' && !token) next('/login');
    else next();
})

export default router;