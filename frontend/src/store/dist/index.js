"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var axios_1 = require("axios");
var firebase_1 = require("firebase");
vue_1["default"].use(vuex_1["default"]);
var cartItems = [];
var products = [];
var loginUser = null;
exports["default"] = new vuex_1["default"].Store({
    state: {
        isLogin: false,
        userId: '',
        loginUser: loginUser,
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
        },
        userName: function (state) {
            return state.loginUser ? state.loginUser.displayName : '';
        },
        photoURL: function (state) {
            return state.loginUser ? state.loginUser.photoURL : '';
        },
        uid: function (state) {
            return state.loginUser ? state.loginUser.uid : null;
        }
    },
    mutations: {
        auth: function (state, userId) {
            state.isLogin = true;
            state.userId = userId;
        },
        increment: function (state, payload) {
            state.notification += payload;
        },
        clear: function (state) {
            state.notification = 0;
        },
        setProducts: function (state, products) {
            state.products = products;
        },
        pushToCart: function (state, productId) {
            state.cartItems.push({
                id: productId,
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
        },
        clearCart: function (state) {
            state.cartItems = [];
        },
        setLoginUser: function (state, user) {
            state.loginUser = user;
        },
        deleteLoginUser: function (state) {
            state.loginUser = null;
        }
    },
    actions: {
        login: function (context, userId) {
            context.commit('auth', userId);
            // googleアカウントSSO機能
            // const googleauthprovider = new firebase.auth.GoogleAuthProvider()
            // firebase.auth().signInWithRedirect(googleauthprovider)
        },
        increment: function (context, payload) {
            setTimeout(function () {
                context.commit('increment', payload);
            }, 1000);
        },
        getAllProducts: function (_a) {
            var commit = _a.commit;
            axios_1["default"].post('http://localhost:3000/v1/select_products')
                .then(function (res) {
                commit('setProducts', res.data);
            })["catch"](function (res) {
                alert(res);
            });
        },
        addToCart: function (_a, productId) {
            var state = _a.state, getters = _a.getters, commit = _a.commit;
            var cartItem = state.cartItems.find(function (item) { return item.id === productId; });
            if (!cartItem) {
                if (getters.uid)
                    firebase_1["default"].firestore().collection("users/" + getters.uid + "/cart_items").add({ id: productId, quantity: 1 });
                commit('pushToCart', productId);
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
        },
        checkout: function (_a) {
            var state = _a.state, commit = _a.commit;
            axios_1["default"].post('http://localhost:3000/v1/update_stock', state.cartItems)
                .then(function (res) {
                commit('clearCart');
            })["catch"](function (res) {
                alert(res);
            });
        },
        setLoginUser: function (_a, user) {
            var commit = _a.commit;
            commit('setLoginUser', user);
        },
        deleteLoginUser: function (_a) {
            var commit = _a.commit;
            commit('deleteLoginUser');
        },
        logout: function () {
            firebase_1["default"].auth().signOut();
        }
    },
    modules: {}
});
