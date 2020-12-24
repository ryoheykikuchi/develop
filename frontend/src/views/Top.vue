<template lang="pug">
  .top
    v-btn(
      @click="loginHundler()"
    ) googleアカウントでログイン
    v-carousel.mb-9(
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    )
      v-carousel-item(
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      )
    //- 新着商品
    h3(align="center") NEW PRODUCTS
    v-slide-group(
    )
      v-slide-item(
        v-for="(item, i) in items"
        :key="i"
      )
        v-card.pa-4(
          height="225px"
          width="225px"
        )
          v-img(
            :src="item.img"
          )
    //- 旧型
    v-row.fill-height(
      align="center"
      justify="center"
    )
      template(
        v-for="(item, i) in items"
      )
        v-col(
          :key="i"
          cols="12"
          md="3"
        )
          v-hover(v-slot:default="{ hover }")
            v-card(
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            )
              v-img(
                :src="item.img"
                height="225px"
              )
                v-expand-transition
                  .d-flex.transition-fast-in-fast-out.black.white--text.darken-2.v-card--reveal(
                    v-if="hover"
                    style="height: 100%;"
                  )
                    v-row
                      v-col
                        p {{ item.name }}
                    v-row
                      v-col
                        p {{ item.color }}
                    v-row
                      v-col
                        p {{ item.price }}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component
export default class TOP extends Vue {
  slides: any = [
    { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' }
  ]

  items: any = [
    {
      name: 'Hoodie',
      color: 'white',
      price: 12000,
      img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
      name: 'T-Shirt',
      color: 'blue',
      price: 6700,
      img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg'
    },
    {
      name: 'cap',
      color: 'black',
      price: 5500,
      img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg'
    },
    {
      name: 'cap',
      color: 'black',
      price: 5500,
      img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg'
    }
  ]

  get notification () {
    return this.$store.state.notification
  }

  get cartItems () {
    return this.$store.state.cartItems
  }

  get countCartItems () {
    return this.$store.getters.countCartItems
  }

  increment (n: number): void {
    this.$store.dispatch('increment', n)
  }

  clear (): void {
    this.$store.commit('clear')
  }

  loginHundler (): void {
    this.$store.dispatch('login')
  }
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
</style>
