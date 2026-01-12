import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        redirect: '/main',
        name: 'main'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router