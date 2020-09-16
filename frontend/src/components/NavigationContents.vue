<template lang="pug">
  .navigation
    v-container
      v-list(nav dense)
        v-list-group(
          v-for="navi in navigationList"
          :key="navi.name"
          :prepend-icon="navi.icon"
          no-action
          :append-icon="navi.lists ? undefined : ''"
          color="primary"
        )
          template(v-slot:activator)
            v-list-item-content
              v-list-item-title {{ navi.name }}
          v-list-item(
            v-for="list in navi.lists"
            :key="list.name"
            link
            :to="list.link"
          )
            v-list-item-content
              v-list-item-title {{ list.name }}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NavigationContents',

  components: {
    //
  },
  data: () => ({
    navigationList: [
      {
        name: 'HOME',
        icon: 'mdi-vuetify',
        lists: [
          { name: 'NEWS', link: '' },
          { name: 'PRESS RELEASE', link: '' }
        ]
      },
      {
        name: 'ABOUT',
        icon: 'mdi-cogs'
      },
      {
        name: 'SHOPS',
        icon: 'mdi-palette'
      },
      {
        name: 'ONLINE STORE',
        icon: 'mdi-view-dashboard'
      },
      {
        name: 'MY PAGE',
        icon: 'mdi-function'
      },
      {
        name: 'HELP',
        icon: 'mdi-vuetify'
      }
    ]
  })
})
</script>
