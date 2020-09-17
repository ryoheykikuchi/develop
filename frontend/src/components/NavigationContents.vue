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
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class NavigationContents extends Vue {
  navigationList: any[] = [
    {
      name: 'SKATE',
      icon: 'mdi-vuetify',
      lists: [
        { name: 'DECK', link: '' },
        { name: 'TRACK', link: '' },
        { name: 'WHEEL', link: '' },
        { name: 'COMPLETE', link: '' },
        { name: 'ACCESSORY', link: '' }
      ]
    },
    {
      name: 'SNOW',
      icon: 'mdi-vuetify',
      lists: [
        { name: 'MENS SNOWBOARD GOODS', link: '' },
        { name: 'WOMENS SNOWBOARD GOODS', link: '' },
        { name: 'MENS WEAR', link: '' },
        { name: 'WOMENS WEAR', link: '' },
        { name: 'MENS GLOBE', link: '' },
        { name: 'WOMENS GLOBE', link: '' },
        { name: 'GOGGLES', link: '' },
        { name: 'ACCESSORY', link: '' }
      ]
    },
    {
      name: 'SURF',
      icon: 'mdi-vuetify',
      lists: [
        { name: 'SURFBOARD', link: '' },
        { name: 'WET SUITS', link: '' },
        { name: 'ACCESSORY', link: '' }
      ]
    }
  ]

  toPage (pageName: string, params?: any): void {
    this.$router.push({ name: pageName, params: params })
  }
}
</script>
