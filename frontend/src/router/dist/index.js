"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var Top_vue_1 = require("../views/Top.vue");
var MembershipRegistration_vue_1 = require("../views/MembershipRegistration.vue");
var Error_vue_1 = require("../views/Error.vue");
var UserList_vue_1 = require("../views/UserList.vue");
var Products_vue_1 = require("../views/Products.vue");
var ShoppingCart_vue_1 = require("../views/ShoppingCart.vue");
var PurchaseProcedure_vue_1 = require("../views/PurchaseProcedure.vue");
var Master_vue_1 = require("../views/Master.vue");
var Login_vue_1 = require("../views/Login.vue");
var store_1 = require("@/store");
vue_1["default"].use(vue_router_1["default"]);
// export default new VueRouter({
var router = new vue_router_1["default"]({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/membership-registration',
            name: 'MembershipRegistration',
            component: MembershipRegistration_vue_1["default"]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login_vue_1["default"]
        },
        {
            path: '/master',
            name: 'Master',
            component: Master_vue_1["default"]
        },
        {
            path: '/user-list',
            name: 'UserList',
            meta: {
                requiresAuth: true
            },
            component: UserList_vue_1["default"]
        },
        {
            path: '/products',
            name: 'Products',
            component: Products_vue_1["default"]
        },
        {
            path: '/shopping-cart',
            name: 'ShoppingCart',
            component: ShoppingCart_vue_1["default"]
        },
        {
            path: '/purchase-procedure',
            name: 'PurchaseProcedure',
            component: PurchaseProcedure_vue_1["default"]
        },
        {
            path: '/top',
            name: 'TOP',
            component: Top_vue_1["default"]
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "about" */ '../views/About.vue'); }); }
        },
        {
            path: '/',
            name: 'Top',
            component: Top_vue_1["default"]
        },
        {
            path: '/*',
            name: 'Error',
            component: Error_vue_1["default"]
        }
    ]
});
router.beforeEach(function (to, from, next) {
    if (to.matched.some(function (record) { return record.meta.requiresAuth; })) {
        if (!store_1["default"].state.isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});
exports["default"] = router;
