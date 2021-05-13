import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

const cartItems: any[] = []
const products: any[] = []
const loginUser: any|null = null
export default new Vuex.Store({
  state: {
    loginUser: loginUser,
    notification: 0,
    products: products,
    cartItems: cartItems,
    totalPrice: 0,
    totalQuantity: 0
  },
  getters: {
    getTotalQuantity (state) {
      return state.totalQuantity
    },
    cartProducts (state) {
      return state.cartItems.map((item) => {
        const product = state.products.find((product) => product.id === item.id)
        return {
          id: item.id,
          name: product.product_name,
          price: product.price,
          quantity: item.quantity
        }
      })
    },
    cartTotalPrice (state, getters) {
      return getters.cartProducts.reduce((total: number, product: any) => {
        return total + product.price * product.quantity
      }, 0)
    },
    cartTotalQuantity (state, getters) {
      return getters.cartProducts.reduce((total: number, product: any) => {
        return total + product.quantity
      }, 0)
    },
    userName (state) {
      return state.loginUser ? state.loginUser.displayName : ''
    },
    photoURL (state) {
      return state.loginUser ? state.loginUser.photoURL : ''
    },
    uid (state) {
      return state.loginUser ? state.loginUser.uid : null
    }
  },
  mutations: {
    increment (state, payload) {
      state.notification += payload
    },
    clear (state) {
      state.notification = 0
    },
    setProducts (state, products) {
      state.products = products
    },
    pushToCart (state, productId) {
      state.cartItems.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, { id }) {
      state.cartItems.filter((item) => item.id === id)[0].quantity++
    },
    deleteItemFromCart (state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId)
    },
    updateQuantity (state, { productId, newQuantity }) {
      state.cartItems.filter((item) => item.id === productId)[0].quantity = newQuantity
      console.log(state.cartItems)
    },
    clearCart (state) {
      state.cartItems = []
    },
    setLoginUser (state, user) {
      state.loginUser = user
    },
    deleteLoginUser (state) {
      state.loginUser = null
    }
  },
  actions: {
    login () {
      const googleauthprovider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(googleauthprovider)
    },
    increment (context, payload) {
      setTimeout(() => {
        context.commit('increment', payload)
      }, 1000)
    },
    getAllProducts ({ commit }) {
      axios.post('http://localhost:3000/v1/select_products')
        .then(res => {
          commit('setProducts', res.data)
        })
        .catch(res => {
          alert(res)
        })
    },
    addToCart ({ state, getters, commit }, productId) {
      const cartItem = state.cartItems.find((item) => item.id === productId)
      if (!cartItem) {
        if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/cart_items`).add({ id: productId, quantity: 1 })
        commit('pushToCart', productId)
      } else {
        commit('incrementItemQuantity', cartItem)
      }
    },
    deleteFromCart ({ commit }, productId) {
      commit('deleteItemFromCart', productId)
    },
    updateItemQuantity ({ commit }, { productId, newQuantity }) {
      commit('updateQuantity', { productId, newQuantity })
    },
    checkout ({ state, commit }) {
      axios.post('http://localhost:3000/v1/update_stock', state.cartItems)
        .then(res => {
          commit('clearCart')
        })
        .catch(res => {
          alert(res)
        })
    },
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    logout () {
      firebase.auth().signOut()
    }
  },

  modules: {
  }
})
