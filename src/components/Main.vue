<template>
  <v-container class="homefone">
    <v-card flat class="transparent mx-auto" max-width="320">
      <Start
        v-if="begin"
        :begin.sync="begin"
        :start.sync="start"
        :address.sync="address"
      />

      <Tests
        v-if="start"
        :start.sync="start"
        :address="address"
        :fullResponseTest.sync="nextStep"
        :finish.sync="finish"
      />

      <v-divider class="my-4" />

      <FullResponseTest
        v-if="nextStep"
        :start.sync="nextStep"
        :address="address"
        :fullResponseTest.sync="nextStep"
        :finish.sync="finish"
      />
    </v-card>

    <v-row justify="center" v-if="finish">
      <p>
        Thank you. Have a nice Internet with <b>DGtek</b>!
      </p>
    </v-row>
  </v-container>
</template>

<script>

import Start from '@/components/Start.vue'
import Tests from '@/components/Tests.vue'
import FullResponseTest from '@/components/FullResponseTest.vue'

export default {
  name: 'Main',

  components: {
    Start,
    Tests,
    FullResponseTest
  },

  data: () => ({
    begin: true,
    finish: false,
    appartmentNumber: '',
    address: '',
    serviceStatus: undefined,
    start: false,
    nextStep: false
  })
}
</script>
