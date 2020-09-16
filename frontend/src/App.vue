<template lang="pug">
  v-app
    AppBar(
      @change-drawer="drawer = !drawer"
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

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    NavigationContents
  },
  data: () => ({
    drawer: null
  })
})
</script>
