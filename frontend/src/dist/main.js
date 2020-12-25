"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var vuetify_1 = require("./plugins/vuetify");
var firebase_1 = require("firebase");
vue_1["default"].config.productionTip = false;
var firebaseConfig = {
    apiKey: 'AIzaSyCSNrTLO_LFmGXif8UD6iTNc3_dx4EouLk',
    authDomain: 'develop-pj.firebaseapp.com',
    databaseURL: 'https://develop-pj-default-rtdb.firebaseio.com',
    projectId: 'develop-pj',
    storageBucket: 'develop-pj.appspot.com',
    messagingSenderId: '191378898784',
    appId: '1:191378898784:web:08c44713dbf3bc7867a805',
    measurementId: 'G-F15E338XJT'
};
// Initialize Firebase
firebase_1["default"].initializeApp(firebaseConfig);
firebase_1["default"].analytics();
new vue_1["default"]({
    router: router_1["default"],
    store: store_1["default"],
    vuetify: vuetify_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
