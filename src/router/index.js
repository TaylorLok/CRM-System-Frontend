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

export default router