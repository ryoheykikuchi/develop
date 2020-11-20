<template lang="pug">
  .purchase-procedure
    h1 購入手続き
    v-data-table(
      :items="cartProducts"
      :headers="headers"
    )
    v-row.justify-center
      v-btn カートを編集
      v-btn 次へ
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

  get cartProducts (): any {
    return this.$store.getters.cartProducts
  }
}
</script>
