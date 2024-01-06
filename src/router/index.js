import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/Login.vue'
import dashboardView from '../views/Dashboard.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboardView,
            meta: { public: false },
        },
        {
            path: '/',
            name: 'login',
            component: loginView,
            meta: { public: true },
        },

    ]
})

export default router