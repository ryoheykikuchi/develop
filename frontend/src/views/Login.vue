<template lang="pug">
  .login
    v-btn(
      @click="loginHundler()"
    ) googleアカウントでログイン
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class Login extends Vue {
  @Prop()
  beforeRouteName: string;

  async loginHundler (): Promise<void> {
    this.$store.dispatch('login').then(() => {
      if (this.beforeRouteName !== undefined) {
        this.$router.push({ name: this.beforeRouteName })
      } else {
        this.$router.push({ name: 'Top' })
      }
    })
  }
}
</script>
<style>
</style>
