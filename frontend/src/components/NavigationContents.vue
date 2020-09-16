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
            v-list-item-title(
              @click="toPage(navi.link)"
            ) {{ navi.name }}
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
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class NavigationContents extends Vue {
  navigationList: any[] = [
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
      icon: 'mdi-cogs',
      link: 'About'
    },
    {
      name: 'SHOPS',
      icon: 'mdi-palette',
      link: 'About'
    },
    {
      name: 'ONLINE STORE',
      icon: 'mdi-view-dashboard',
      link: 'Products'
    },
    {
      name: 'MY PAGE',
      icon: 'mdi-function',
      link: 'About'
    },
    {
      name: 'HELP',
      icon: 'mdi-vuetify',
      link: 'About'
    }
  ]

  toPage (pageName: string, params?: any): void {
    this.$router.push({ name: pageName, params: params })
  }
}
</script>
