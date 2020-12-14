<template lang="pug">
  .user-list
    h1 会員マスタ
    v-card-title 会員情報
    v-divider
    v-card(tile flat)
      v-card-text
        v-data-table(
          :headers="headers"
          :items="users"
          :loading="loading"
        )
          template(
            v-slot:item.action="{ header }"
          )
            v-btn(
              @click=""
              small
              icon
            )
              v-icon mdi-information
            v-btn.ml-3(
              @click=""
              small
              icon
            )
              v-icon mdi-delete
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class Sample extends Vue {
  users: any[] = [];
  loading = false;
  headers: any[] = [
    { text: 'id', value: 'id' },
    { text: 'name', value: 'name' },
    { text: 'email address', value: 'email' },
    { text: '', value: 'action', sortable: false, width: '140px' }
  ];

  async created (): Promise<void> {
    this.loading = true
    await axios.post('http://localhost:3000/v1/select_users')
      .then(res => {
        this.users = res.data
        this.loading = false
      })
      .catch(res => {
        console.log(res)
        this.loading = false
        alert(res)
      })
  }
}

</script>
