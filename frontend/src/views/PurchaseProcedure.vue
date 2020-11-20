<template lang="pug">
  .purchase-procedure
    h1 購入手続き
    v-data-table(
      :items="$store.getters.cartProducts"
      :headers="headers"
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
        @click="purchase()"
        width="150px"
        color="black"
        dark
      ) 購入を確定する
    v-row.justify-center
      v-btn.my-2(
        to="/shopping-cart"
        width="150px"
      ) カートを編集する
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class PurchaseProcedure extends Vue {
  headers: any = [
    { text: '商品名', value: 'name' },
    { text: '価格', value: 'price' },
    { text: '数量', value: 'quantity' }
  ]

  purchase (): void {
    //
  }
}
</script>
