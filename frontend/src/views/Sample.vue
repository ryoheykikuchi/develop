<template lang="pug">
  .sample
    h1 会員登録
    v-row.justify-center()
      v-col(
        cols="12"
        sm="5"
      )
        v-text-field(
          label="氏名"
          outlined
          dense
          v-model="user.name"
        )
        v-text-field(
          label="メールアドレス"
          outlined
          dense
          v-model="user.email"
        )
        v-text-field(
          label="郵便番号"
          outlined
          dense
        )
        v-text-field(
          label="住所2"
          outlined
          dense
        )
        v-text-field(
          label="クレジットカード番号"
          outlined
          dense
        )
        v-text-field(
          label="有効期限"
          outlined
          dense
        )
        v-text-field(
          label="名義"
          outlined
          dense
        )
        v-text-field(
          label="セキュリティキー"
          outlined
          dense
        )
        v-btn(
          dark
          @click="submit()"
          color="primary"
        ) Submit
        v-alert.mt-5(
          v-if="success"
          type="success"
          dense
          outlined
        ) {{ message }}
        v-alert.mt-5(
          v-if="error"
          type="error"
          dense
          outlined
        ) {{ message }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class Sample extends Vue {
  user: any = {
    name: '',
    email: ''
  };

  message: any = '';
  alertType = '';
  success = false;
  error = false;

  mounted () {
    //
  }

  created () {
    //
  }

  submit (): void {
    if (this.user.name === '' || this.user.email === '') {
      this.message = '未入力の項目があります'
      this.success = false
      this.error = true
    } else {
      axios.post('http://localhost:3000/v1/insert_user', this.user)
        .then(res => {
          this.message = res.data
          this.alertType = 'success'
          this.success = true
          this.error = false
        })
        .catch(res => {
          console.log(res)
          alert(res)
        })
    }
  }
}
</script>
