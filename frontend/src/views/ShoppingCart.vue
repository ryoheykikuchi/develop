<template lang="pug">
  .shopping-cart
    h1 カート
    v-data-table(
      :items="cartProducts"
      :headers="headers"
    )
      template(v-slot:item.action="{ item }")
        v-btn(
          icon
          @click="$store.dispatch('deleteFromCart', item.id)"
        )
          v-icon(
          ) mdi-delete
      template(v-slot:item.quantity="{ item }")
        v-select(
          v-model="item.quantity"
          :items="quantitySelects"
          outlined
          dense
          style="height: 40px;"
          @input="$store.commit('updateQuantity', { productId: item.id, newQuantity: item.quantity })"
        )
    v-row
      v-col(cols=2)
        p 商品点数
        p 小計(税込み)
      v-col.text-right(cols=2)
        p {{ $store.getters.cartTotalQuantity }} 点
        p {{ $store.getters.cartTotalPrice.toLocaleString() }} 円
    v-row.justify-center
      v-btn.my-2(
        to="/purchase-procedure"
        width="150px"
        color="black"
        dark
      ) 購入手続きへ
    v-row.justify-center
      v-btn.my-2(
        to="/products"
        width="150px"
      ) お買い物を続ける
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class ShoppingCart extends Vue {
  headers: any = [
    { text: '商品名', value: 'name' },
    { text: '価格', value: 'price' },
    { text: '数量', value: 'quantity', width: '10%' },
    { text: '', value: 'action', width: '5%' }
  ]

  quantitySelects: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  get cartProducts (): any {
    return this.$store.getters.cartProducts
  }

  created (): void {
    console.log(this.cartProducts)
  }
}
</script>
<style lang="sass" scoped>
</style>
