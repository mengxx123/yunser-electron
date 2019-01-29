import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@/views/Home').default
        },
        {
            path: '/about',
            name: 'landing-page',
            component: require('@/views/About').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
