<template>
  <v-app>
    <v-row class="homefone text-center pt-5" style="max-height: 200px">
      <v-card flat class="transparent mx-auto text-center" max-width="360">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="50"
        />
        <h5 class="mt-5" style="color: #777">
          <small>Check your connection status</small>
        </h5>
      </v-card>
    </v-row>
    <v-main class="homefone">
      <Main />
    </v-main>
  </v-app>
</template>

<script>

import 'dgtek-styles'
import Main from '@/components/Main.vue'

export default {
  name: 'App',

  components: {
    Main
  },

  data: () => ({
    //
  })
}
</script>

<style>
p, .v-input, .v-label, .v-list-item__title {
  font-size: 14px !important;
  font-family: Gilroy, monospace;
}

p {
  text-align: justify;
}

input, textarea {
  -webkit-user-select: text;
}
</style>
