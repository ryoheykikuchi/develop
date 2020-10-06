<template lang="pug">
  .app-bar
    v-app-bar(
      app
      color="primary"
      clipped-left
      dark
    )
      v-app-bar-nav-icon.d-lg-none(
        @click="$emit('change-drawer')"
      )
      a.mx-2(
        href="/"
        style="color: #ffffff; text-decoration: none; font-size: 1.7em;"
      ) RIDE SHOP
      v-spacer
      .mr-4
        v-badge(
          avatar
          color="error"
          :content="$store.state.notification"
          v-model="$store.state.notification"
          overlap
        )
          v-avatar(
            size="36"
          )
            v-icon(large) mdi-account-circle
      v-toolbar-items
        v-menu(
          open-on-hover
          bottom
          offset-y
        )
          template(
            v-slot:activator="{ on, attrs }"
          )
            v-btn(
              v-on="on"
              v-bind="attrs"
              text
            ) 涼平
          v-list
            v-list-item(
              v-for="item in accountMenus"
              @click=""
            )
              v-list-item-title {{ item.name }}
        v-menu(
          offset-y
          open-on-hover
        )
          template(v-slot:activator="{ on }")
            v-btn(
              text
              v-on="on"
            ) MENU
          v-list(nav)
            v-list-item-group(color="primary")
              v-list-item(
                v-for="menu in menus"
                :key="menu.name"
                :to="menu.link"
              )
                v-list-item-content
                  v-list-item-title {{ menu.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
  menus: any = [
    {
      name: 'マスタ',
      link: '/user-list'
    },
    {
      name: '会員登録',
      link: '/sample'
    },
    {
      name: 'ONLINE STORE',
      link: '/products'
    }
  ]

  accountMenus: any = [
    {
      name: 'マイページ',
      link: ''
    },
    {
      name: '購入履歴',
      link: ''
    },
    {
      name: '会員情報変更',
      link: ''
    }
  ]
}
</script>
