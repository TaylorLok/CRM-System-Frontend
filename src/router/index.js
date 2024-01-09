import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/Login.vue'
import dashboardView from '../views/Dashboard.vue'
import ClientView from '../views/Home.vue'
import indexView from '../views/Clients/index.vue'
import addClientView from '../views/Clients/addClient.vue'
import updateClientView from '../views/Clients/updateClient.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/',
            name: 'login',
            component: loginView,
            meta: { public: true },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboardView,
        },
        {
            path: '/clients',
            name: 'clients',
            component: indexView,
        },
        {
            path: '/clients/details',
            name: 'clientDetails',
            component: ClientView,
        },
        {
            path: '/clients/save',
            name: 'addClient',
            component: addClientView,
        },
        {
            path: '/client/:id/update',
            name: 'updateClient',
            component: updateClientView,
        },

    ]
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('user');
    console.log('Authneticate user', isLoggedIn);

    if (!to.meta.public && !isLoggedIn) {
        return next({ name: 'login' });
    }
    if (to.meta.public && isLoggedIn) {
        return next({ name: 'dashboard' });
    }
    else {
        console.log('Navigating authneticated routes');
        next();
    }
})

router.beforeResolve(async (to, form, next) => {
    console.log('Before Resolve');
    await next();
})

export default router