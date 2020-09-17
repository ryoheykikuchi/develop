<template lang="pug">
  .top
    v-carousel(
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
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Prop, Emit, Component, Watch } from 'vue-property-decorator'
@Component
export default class TOP extends Vue {
  slides: any = [
    { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' }
  ]
}
</script>
