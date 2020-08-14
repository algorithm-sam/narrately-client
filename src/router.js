import Vue from 'vue';
import Router from 'vue-router';
import JWTDecode from 'jwt-decode'

import { isAuthenticated } from './repository';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Authenticate from './views/Authenticate.vue';
import Dashboard from './views/Dashboard.vue';
import Profile from './views/Profile.vue';
import Users from './views/Users.vue';
import User from './views/User.vue';
import Conversions from './views/Conversions.vue';
import MyConversions from './views/MyConversions.vue';
import UserActivity from './views/UserActivity.vue';
import AllActivity from './views/AllActivity.vue';
import NotFound from './views/errors/404.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Authenticate,
      meta: { guest: true, authType: "login" },
    },
    {
      path: '/user/activate/:token',
      name: 'activate-user',
      component: Home,
    },
    {
      path: '/password/reset',
      name: 'send-password-reset',
      component: Authenticate,
      meta: { guest: true, authType: "send-password-reset" },
    },
    {
      path: '/password/reset/:token',
      name: 'handle-password-reset',
      component: Authenticate,
      meta: { guest: true, authType: "handle-password-reset" },
    },
    {
      path: '/register',
      name: 'register',
      component: Authenticate,
      meta: { guest: true, authType: "register" },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/users/:user_id',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/activities',
      name: 'all-activities',
      component: AllActivity,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/conversions',
      name: 'conversions',
      component: Conversions,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/user/conversions',
      name: 'my-conversions',
      component: MyConversions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activities',
      name: 'my-activities',
      component: UserActivity,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/404', 
      name: 'not-found', 
      component: NotFound 
    },  
    { 
      path: '*', 
      name: 'not-found-root', 
      component: NotFound
    },
  ]
})

router.beforeEach((to, from, next) => {
    const auth = isAuthenticated();
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth) {
            next({
                path: '/login',
                query: { nextUrl: to.fullPath }
            })
        } else {
            if(to.matched.some(record => record.meta.is_admin)) {
                const decoded = (JWTDecode(localStorage.getItem('x-access-token')));
                
                if(decoded.user && decoded.user.isAdmin){
                    next();
                }
                else{
                    next({ name: 'dashboard', params: { msg: "Administrative privileges needed"}});
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(!auth){
            next();
        }
        else{
            next({ name: 'dashboard'});
        }
    }else {
        next() ;
    }
})

export default router
