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
            v-img(
              v-if="$store.state.loginUser"
              :src="$store.getters.photoURL"
            )
            v-icon(
              v-else
              large
            ) mdi-account-circle
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
              v-if="$store.state.loginUser"
              v-on="on"
              v-bind="attrs"
              text
            ) {{ $store.getters.userName }}
            v-btn(
              v-else
              v-on="on"
              v-bind="attrs"
              text
            ) GUEST
          v-list
            v-list-item(
              v-for="item in accountMenus"
              v-if="!item.nonDisplay"
              @click="$emit('account-event', item.eventName)"
            )
              v-list-item-title(
              ) {{ item.name }}
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
      link: '/membership-registration'
    },
    {
      name: 'ONLINE STORE',
      link: '/products'
    }
  ]

  get accountMenus (): any {
    return [
      {
        name: 'マイページ',
        link: '',
        eventName: '',
        nonDisplay: !this.$store.state.loginUser
      },
      {
        name: '購入履歴',
        link: '',
        eventName: '',
        nonDisplay: !this.$store.state.loginUser
      },
      {
        name: '会員情報変更',
        link: '',
        eventName: '',
        nonDisplay: !this.$store.state.loginUser
      },
      {
        name: 'ログアウト',
        link: '',
        eventName: 'logout',
        nonDisplay: !this.$store.state.loginUser
      },
      {
        name: 'ログイン',
        link: '',
        eventName: '',
        nonDisplay: this.$store.state.loginUser
      },
      {
        name: '新規会員登録',
        link: '',
        eventName: '',
        nonDisplay: this.$store.state.loginUser
      }
    ]
  }

  get isLoggedIn (): boolean {
    return this.$store.state.loginUser
  }
}
</script>
