<template lang="pug">
  .login
    //- googleのSSO機能(後回し)
    //- v-btn(
    //-   @click="loginHundler()"
    //- ) googleアカウントでログイン
    h1 ログイン
    v-row.justify-center()
      v-col(
        cols="12"
        sm="5"
      )
        v-text-field(
          label="メールアドレス"
          outlined
          dense
          v-model="infoAuth.email"
        )
        v-text-field(
          label="パスワード"
          outlined
          dense
          v-model="infoAuth.password"
        )
        v-btn(
          dark
          @click="postAuth()"
          color="primary"
        ) LOGIN
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'

// 認証情報インターフェイス
interface InfoAuth {
  email: string;
  password: string;
}

@Component
export default class Login extends Vue {
  @Prop()
  beforeRouteName: string;

  infoAuth: InfoAuth = {
    email: '',
    password: ''
  }

  msg = ''

  async postAuth (): Promise<void> {
    this.msg = await axios.post('http://localhost:3000/v1/auth_login', this.infoAuth)
      .then(res => {
        console.log(res)
        return res.data.message
      })
      .catch(error => {
        console.log(error)
        return error.message
      })

    if (this.msg === 'OK') {
      this.$store.dispatch('login', this.infoAuth.email).then(() => {
        if (this.beforeRouteName !== undefined) {
          this.$router.push({ name: this.beforeRouteName })
        } else {
          this.$router.push({ name: 'Top' })
        }
      })
    }
  }

  // googleアカウントのSSO機能
  // async loginHundler (): Promise<void> {
  //   this.$store.dispatch('login').then(() => {
  //     if (this.beforeRouteName !== undefined) {
  //       this.$router.push({ name: this.beforeRouteName })
  //     } else {
  //       this.$router.push({ name: 'Top' })
  //     }
  //   })
  // }
}
</script>
<style>
</style>
