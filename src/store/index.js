import { createStore } from 'vuex';
import router from '../router';

export default createStore({
    state: {
        isLoggedIn: !!localStorage.getItem('user'),
        user: null
    },
    mutations: {
        LOGIN(state, user) {
            state.isLoggedIn = true;
            state.user = user;
            console.log('Logged In');
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.user = null;
            console.log('Logged Out');
        },
    },
    actions: {
        login(context, user) {
            localStorage.setItem('user', user.name)
            context.commit('LOGIN', user);
            router.push({ name: 'dashboard' });
        },
        logout(context) {
            localStorage.removeItem('user');
            context.commit('LOGOUT');
            router.push({ name: 'login' });
        }
    },
})