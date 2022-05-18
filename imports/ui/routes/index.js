import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
let routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../pages/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../pages/Category.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: () => import("../pages/Customer.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/item",
    name: "item",
    component: () => import("../pages/Item.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/supplier",
    name: "supplier",
    component: () => import("../pages/Supplier.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/purchase",
    name: "purchase",
    component: () => import("../pages/Purchase.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sale",
    name: "sale",
    component: () => import("../pages/Sale.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/import",
    name: "import",
    component: () => import("../pages/Import.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/export",
    name: "export",
    component: () => import("../pages/Export.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/print",
    name: "print",
    component: () => import("../pages/Print.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!Meteor.userId()) {
      next({
        path: "./login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
