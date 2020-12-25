<template lang="pug">
  v-app
    AppBar(
      @change-drawer="drawer = !drawer"
      @account-event="event"
    )
    v-navigation-drawer(
      app
      clipped
      width="300"
      v-model="drawer"
    )
      NavigationContents
    v-main
      v-container
        router-view
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import AppBar from './components/AppBar.vue'
import NavigationContents from './components/NavigationContents.vue'
import Component from 'vue-class-component'
import firebase from 'firebase'

@Component({
  components: {
    AppBar,
    NavigationContents
  }
})
export default class App extends Vue {
  drawer: boolean|null = null

  async created (): Promise<void> {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setLoginUser', user)
      } else {
        this.$store.dispatch('deleteLoginUser')
      }
    })
  }

  async event (eventName: string): Promise<void> {
    if (eventName === 'logout') {
      await this.$store.dispatch('logout')
      await alert('ログアウトしました')
    }
  }
}
</script>
