import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'

Vue.use(Vuex)

const cartItems: any[] = []
const products: any[] = []
export default new Vuex.Store({
  state: {
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
    pushToCart (state, product) {
      state.cartItems.push({
        id: product.id,
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
    }
  },
  actions: {
    login () {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(googleAuthProvider)
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
    addToCart ({ state, commit }, product) {
      const cartItem = state.cartItems.find((item) => item.id === product.id)
      if (!cartItem) {
        commit('pushToCart', product)
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
    }
  },

  modules: {
  }
})
