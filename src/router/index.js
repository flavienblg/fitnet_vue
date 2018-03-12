import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MissionList from '@/components/MissionList'
import MissionItem from '@/components/MissionItem'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '*',
            name: 'redirect',
            redirect: '/login'
        },
        {
            path: '/',
            name: 'accueil',
            redirect: '/login'
        },
        {
            path: '/mission_list',
            name: 'mission_list',
            component: MissionList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/mission_item',
            name: 'mission_item',
            component: MissionItem,
            props: true,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('mission_list');
    else next();
})

export default router