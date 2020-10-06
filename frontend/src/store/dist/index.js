"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var axios_1 = require("axios");
vue_1["default"].use(vuex_1["default"]);
exports["default"] = new vuex_1["default"].Store({
    state: {
        notification: 0,
        products: [],
        cartItems: []
    },
    mutations: {
        increment: function (state, payload) {
            state.notification += payload;
        },
        clear: function (state) {
            state.notification = 0;
        },
        setProducts: function (state, products) {
            state.products = products;
        },
        pushToCart: function (state, product) {
            state.cartItems.push({
                product: product,
                quantity: 1
            });
        }
    },
    getters: {
        cartItemsCount: function (state) {
            return state.cartItems.length;
        }
    },
    actions: {
        increment: function (context, payload) {
            setTimeout(function () {
                context.commit('increment', payload);
            }, 1000);
        },
        getAllProducts: function (context) {
            axios_1["default"].post('http://localhost:3000/v1/select_products')
                .then(function (res) {
                context.commit('setProducts', res.data);
            })["catch"](function (res) {
                alert(res);
            });
        },
        addToCart: function (context, product) {
            context.commit('pushToCart', product);
        }
    },
    modules: {}
});
