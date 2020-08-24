import store from '../store'
import Home from '../views/home'
import Login from '../views/login.vue'
import Forgot from '../views/forgot.vue'
import Profile from '../views/profile.vue'
import Page404 from '../views/404.vue'
import EditForm from '../views/section/edit'
import View from '../views/section/view'
import Index from '../views/section/index'

const beforeResolve = (routeTo, routeFrom, next) => {
  try {
    const section = require('../sections/' + routeTo.params.section).default

    store
      .dispatch('section/fetchItem', {
        route: section.route,
        id: routeTo.params.id,
      })
      .then((response) => {
        routeTo.meta.tmp.object = response.data
        routeTo.section = section
        // Continue to the route.
        next()
      })
      .catch(() => {
        next({ name: '404', params: { resource: 'User' } })
      })
  } catch (e) {
    next({
      name: '404',
      params: { resource: capitalize(routeTo.params.section) },
    })
  }
}

const capitalize = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      authRequired: true,
    },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => import('../views/profile.vue'),
    meta: {
      authRequired: true,
      // HACK: In order to share data between the `beforeResolve` hook
      // and the `props` function, we must create an object for temporary
      // data only used during route resolution.
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store
          // Try to fetch the user's information by their username
          .dispatch('users/fetchUser', { username: routeTo.params.username })
          .then((user) => {
            // Add the user to `meta.tmp`, so that it can
            // be provided as a prop.
            routeTo.meta.tmp.user = user
            // Continue to the route.
            next()
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({ name: '404', params: { resource: 'User' } })
          })
      },
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: (route) => ({ user: route.meta.tmp.user }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut').then(() => next({ name: 'home' }))
      },
    },
  },
  {
    path: '/:section/index',
    name: 'View section',
    component: Index,
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        const section = require('../sections/' + routeTo.params.section).default
        if (section.route) {
          routeTo.meta.tmp.section = section
          next()
        }
      },
    },
  },
  {
    path: '/:section/view/:id',
    name: 'View item',
    component: View,
    meta: {
      authRequired: true,
      beforeResolve,
    },
  },
  {
    path: '/:section/edit/:id',
    name: 'Edit item',
    component: EditForm,
    meta: {
      authRequired: true,
      beforeResolve,
    },
  },
  {
    path: '*',
    name: '404',
    component: Page404,
    meta: {
      authRequired: true,
    },
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
]

export default routes
