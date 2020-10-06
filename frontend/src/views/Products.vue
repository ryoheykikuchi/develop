<template lang="pug">
  .products
    h1 ONLINE STORE
    v-divider
    v-card(tile flat)
      v-card-text
        v-data-table(
          :headers="headers"
          :items="items"
          :loading="loading"
        )
          template(
            v-slot:item.stock="{ item }"
          )
            span(v-if="item.stock > 3") あり
            span(v-else-if="item.stock > 0") 残りわずか
            span(v-else) 入荷待ち
          template(
            v-slot:item.action="{ item }"
          )
            v-btn(
              @click=""
              small
              icon
            )
              v-icon mdi-information
            v-btn.ml-3(
              @click="addToCart(item)"
              small
              icon
            )
              v-icon mdi-cart-arrow-down
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class Products extends Vue {
  loading = false;
  headers: any[] = [
    { text: 'product_name', value: 'product_name' },
    { text: 'price', value: 'price' },
    { text: 'stock', value: 'stock' },
    { text: '', value: 'action', sortable: false, width: '200px' }
  ];

  get items (): any {
    return this.$store.state.products
  }

  created (): void {
    this.$store.dispatch('getAllProducts')
  }

  // async created (): Promise<void> {
  //   this.loading = true
  //   await axios.post('http://localhost:3000/v1/select_products')
  //     .then(res => {
  //       this.items = res.data
  //       this.loading = false
  //       console.log(this.items)
  //     })
  //     .catch(res => {
  //       console.log(res)
  //       this.loading = false
  //       alert(res)
  //     })
  // }

  addToCart (product: any): void {
    this.$store.dispatch('addToCart', product)
    console.log(this.$store.state.cartItems)
  }
}

</script>
