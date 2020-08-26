import store from "../store";
import Home from "../views/home";
import Login from "../views/login.vue";
import Forgot from "../views/forgot.vue";
import Profile from "../views/profile.vue";
import Page404 from "../views/404.vue";
import EditForm from "../views/section/edit";
import AddForm from "../views/section/add";
import View from "../views/section/view";
import Index from "../views/section/index";

const beforeResolve = (routeTo, routeFrom, next) => {
  try {
    const sectionData = require("../sections/" + routeTo.params.section)
      .default;

    store
      .dispatch("section/fetchItem", {
        route: sectionData.route,
        id: routeTo.params.id
      })
      .then(response => {
        routeTo.meta.object = response.data;
        routeTo.meta.sectionData = sectionData;
        // Continue to the route.
        next();
      })
      .catch(() => {
        next({ name: "404", replace: true });
      });
  } catch (e) {
    next({
      name: "404",
      replace: true
    });
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        Promise.all([
          store.dispatch("section/counter", {
            route: "companies"
          }),
          store.dispatch("section/counter", {
            route: "employees"
          })
        ]).then(() => {
          next();
        });
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  },
  {
    path: "/forgot",
    name: "forgot",
    component: Forgot,
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch("auth/logOut").then(() => next({ name: "home" }));
      }
    }
  },
  {
    path: "/:section/index",
    name: "View section",
    component: Index,
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        try {
          const sectionData = require("../sections/" + routeTo.params.section)
            .default;
          if (sectionData.route) {
            store
              .dispatch("section/fetchIndex", {
                route: sectionData.route
              })
              .then(response => {
                routeTo.meta.sectionData = sectionData;
                // Continue to the route.
                next();
              })
              .catch(e => {
                next({ name: "404", replace: true });
              });
          } else {
            next({ name: "404", replace: true });
          }
        } catch (e) {
          next({ name: "404", replace: true });
        }
      }
    }
  },
  {
    path: "/:section/view/:id",
    name: "View item",
    component: View,
    meta: {
      authRequired: true,
      beforeResolve
    }
  },
  {
    path: "/:section/edit/:id",
    name: "Edit item",
    component: EditForm,
    meta: {
      authRequired: true,
      beforeResolve
    }
  },
  {
    path: "/:section/add",
    name: "Add item",
    component: AddForm,
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        try {
          const sectionData = require("../sections/" + routeTo.params.section)
            .default;
          if (sectionData.route) {
            routeTo.meta.sectionData = sectionData;
            next();
          } else {
            console.log("redirect 2");
            next({ name: "404", replace: true });
          }
        } catch (e) {
          console.log("redirect 3", e);
          next({ name: "404", replace: true });
        }
      }
    }
  },
  {
    name: "404",
    path: "/404",
    component: Page404
  },
  {
    path: "*",
    redirect: "404"
  }
];

export default routes;
