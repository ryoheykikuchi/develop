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
      v-toolbar-items
        v-menu(offset-y)
          template(v-slot:activator="{on}")
            v-btn(
              text
              v-on="on"
            ) MENU
              v-icon mdi-menu-down
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

export default Vue.extend({
  name: 'AppBar',

  components: {
    //
  },
  data: () => ({
    menus: [
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
  })
})
</script>
