<template lang="pug">
  .membership-registration
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
          label="住所"
          outlined
          dense
          v-model="user.address"
        )
        v-text-field(
          label="メールアドレス"
          outlined
          dense
          v-model="user.email"
        )
        v-text-field(
          label="パスワード"
          outlined
          dense
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          v-model="user.password"
          @click:append="showPassword = !showPassword"
        )
        v-text-field(
          label="パスワード(確認)"
          outlined
          dense
          :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPass ? 'text' : 'password'"
          v-model="confirmPass"
          @click:append="showConfirmPass = !showConfirmPass"
        )
        v-btn(
          dark
          @click="submit()"
          color="primary"
        ) Submit
        v-alert.mt-5(
          v-if="isSuccess"
          type="success"
          dense
          outlined
        ) {{ message }}
        v-alert.mt-5(
          v-if="isError"
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
export default class MembershipRegistration extends Vue {
  confirmPass = '';
  showPassword = false;
  showConfirmPass = false;

  user: any = {
    name: '',
    email: '',
    address: '',
    password: ''
  };

  message = '';
  alertType = '';
  isSuccess = false;
  isError = false;

  mounted () {
    //
  }

  created () {
    //
  }

  submit (): void {
    if (this.user.name === '' || this.user.email === '') {
      this.message = '未入力の項目があります'
      this.isSuccess = false
      this.isError = true
    } else {
      axios.post('http://localhost:3000/v1/insert_user', this.user)
        .then(res => {
          this.message = res.data
          this.alertType = 'success'
          this.isSuccess = true
          this.isError = false
        })
        .catch(res => {
          console.log(res)
          alert(res)
        })
    }
  }
}
</script>
