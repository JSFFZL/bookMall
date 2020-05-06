import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/Home"
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: "/Home/Sy",
    children: [
      {
        path: '/Home/Sy',
        name: 'Sy',
        component: () => import('../views/Home/Sy.vue'),
      },
      {
        path: '/Home/Fl',
        name: 'Fl',
        component: () => import('../views/Home/Fl.vue'),
      },
      {
        path: '/Home/Ph',
        name: 'Ph',
        component: () => import('../views/Home/Ph.vue'),
      },
      {
        path: '/Home/Sj',
        name: 'Sj',
        component: () => import('../views/Home/Sj.vue'),
      }, {
        path: '/Home/About',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    ]
  },

  {
    path: '/Login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/Details',
    name: 'details',
    component: () => import('../views/Details.vue')
  }
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path == "/Home/Sj") {
    let uid = localStorage.getItem("uid");
    if (uid) {
      next();
    } else {
      next("/Login");
    }
  } else {
    next();
  }
})


export default router
