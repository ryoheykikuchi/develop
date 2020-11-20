"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var axios_1 = require("axios");
vue_1["default"].use(vuex_1["default"]);
var cartItems = [];
var products = [];
exports["default"] = new vuex_1["default"].Store({
    state: {
        notification: 0,
        products: products,
        cartItems: cartItems,
        totalPrice: 0,
        totalQuantity: 0
    },
    getters: {
        getTotalQuantity: function (state) {
            return state.totalQuantity;
        },
        cartProducts: function (state) {
            return state.cartItems.map(function (item) {
                var product = state.products.find(function (product) { return product.id === item.id; });
                return {
                    id: item.id,
                    name: product.product_name,
                    price: product.price,
                    quantity: item.quantity
                };
            });
        },
        cartTotalPrice: function (state, getters) {
            return getters.cartProducts.reduce(function (total, product) {
                return total + product.price * product.quantity;
            }, 0);
        },
        cartTotalQuantity: function (state, getters) {
            return getters.cartProducts.reduce(function (total, product) {
                return total + product.quantity;
            }, 0);
        }
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
                id: product.id,
                quantity: 1
            });
        },
        incrementItemQuantity: function (state, _a) {
            var id = _a.id;
            state.cartItems.filter(function (item) { return item.id === id; })[0].quantity++;
        },
        deleteItemFromCart: function (state, productId) {
            state.cartItems = state.cartItems.filter(function (item) { return item.id !== productId; });
        },
        updateQuantity: function (state, _a) {
            var productId = _a.productId, newQuantity = _a.newQuantity;
            state.cartItems.filter(function (item) { return item.id === productId; })[0].quantity = newQuantity;
            console.log(state.cartItems);
        }
    },
    actions: {
        increment: function (context, payload) {
            setTimeout(function () {
                context.commit('increment', payload);
            }, 1000);
        },
        getAllProducts: function (_a) {
            var commit = _a.commit;
            axios_1["default"].post('http://localhost:3000/select_products')
                .then(function (res) {
                commit('setProducts', res.data);
            })["catch"](function (res) {
                alert(res);
            });
        },
        addToCart: function (_a, product) {
            var state = _a.state, commit = _a.commit;
            var cartItem = state.cartItems.find(function (item) { return item.id === product.id; });
            if (!cartItem) {
                commit('pushToCart', product);
            }
            else {
                commit('incrementItemQuantity', cartItem);
            }
        },
        deleteFromCart: function (_a, productId) {
            var commit = _a.commit;
            commit('deleteItemFromCart', productId);
        },
        updateItemQuantity: function (_a, _b) {
            var commit = _a.commit;
            var productId = _b.productId, newQuantity = _b.newQuantity;
            commit('updateQuantity', { productId: productId, newQuantity: newQuantity });
        }
    },
    modules: {}
});
