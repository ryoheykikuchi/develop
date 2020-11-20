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
    totalPrice: 0
  },
  getters: {
    countCartItems: function countCartItems(state) {
      return state.cartItems.length;
    },
    cartProducts: function cartProducts(state) {
      return state.cartItems.map(function (item) {
        var product = state.products.find(function (product) {
          return product.id === item.id;
        });
        return {
          name: product.product_name,
          price: product.price,
          quantity: item.quantity
        };
      });
    },
    getTotalPrice: function getTotalPrice(state) {
      return state.totalPrice;
    }
  },
  mutations: {
    increment: function increment(state, payload) {
      state.notification += payload;
    },
    clear: function clear(state) {
      state.notification = 0;
    },
    setProducts: function setProducts(state, products) {
      state.products = products;
    },
    pushToCart: function pushToCart(state, product) {
      state.cartItems.push({
        id: product.id,
        quantity: 1
      });
    },
    incrementItemQuantity: function incrementItemQuantity(state, _a) {
      var id = _a.id;
      var cartItem = state.cartItems.find(function (item) {
        return item.id === id;
      });
      cartItem.quantity++;
    },
    sumProductsPrice: function sumProductsPrice(state, price) {
      state.totalPrice += price;
      console.log(state.totalPrice);
    }
  },
  actions: {
    increment: function increment(context, payload) {
      setTimeout(function () {
        context.commit('increment', payload);
      }, 1000);
    },
    getAllProducts: function getAllProducts(context) {
      axios_1["default"].post('http://localhost:3000/select_products').then(function (res) {
        context.commit('setProducts', res.data);
      })["catch"](function (res) {
        alert(res);
      });
    },
    addToCart: function addToCart(_a, product) {
      var state = _a.state,
          commit = _a.commit;
      var cartItem = state.cartItems.find(function (item) {
        return item.id === product.id;
      });

      if (!cartItem) {
        commit('pushToCart', product);
      } else {
        commit('incrementItemQuantity', cartItem);
      }

      commit('sumProductsPrice', product.price);
    }
  },
  modules: {}
});