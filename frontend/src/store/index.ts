import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: 0,
    products: [],
    cartItems: []
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
        product: product,
        quantity: 1
      })
    }
  },
  getters: {
    cartItemsCount (state) {
      return state.cartItems.length
    }
  },
  actions: {
    increment (context, payload) {
      setTimeout(() => {
        context.commit('increment', payload)
      }, 1000)
    },
    getAllProducts (context) {
      axios.post('http://localhost:3000/v1/select_products')
        .then(res => {
          context.commit('setProducts', res.data)
        })
        .catch(res => {
          alert(res)
        })
    },
    addToCart (context, product) {
      context.commit('pushToCart', product)
    }
  },
  modules: {
  }
})
