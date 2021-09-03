<template>
  <v-card-text style="max-height: 64px">
    <v-card-text v-if="start">
      <p>
        Please enter your preferred email address and phone number and our tech support will contact you shortly
      </p>
      <v-text-field
        outlined
        color="success"
        label="email"
        v-model="email"
        :rules="[rules.required, rules.email]"
      />

      <v-text-field
        v-model="phone"
        prefix="+61"
        :rules="[rules.required, rules.mobile]"
        label="mobile phone number"
        outlined
        dense
      ></v-text-field>

      <p>
        If all 3 tests passed and your internet connection has not recovered, please run a <b>full response test</b>
      </p>

      <v-btn
        text
        color="primary"
        :disabled="!address"
        @click="sendMessage"
      >
        Start full response test
      </v-btn>

      <v-btn
        text
        color="primary"
        @click="finishTesting"
      >
        Finish
      </v-btn>
    </v-card-text>

    <v-row align="center">
      <v-col cols="8">
        <v-checkbox
          v-if="test"
          v-model="value"
          label="Full response test"
          color="primary"
          hide-details
          readonly
        />
      </v-col>
      <v-col cols="4">
        <v-progress-circular
          v-if="progress"
          :indeterminate="progress"
          :active="progress"
          color="primary"
          class="mt-4"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>

import { rules } from '@/config'
import { sendMessage } from '@/helpers'

export default {
  name: 'FullResponseTest',

  props: ['start', 'address', 'fullResponseTest'],

  data: () => ({
    email: '',
    phone: '',
    progress: false,
    test: false,
    value: false,
    rules: rules
  }),

  methods: {
    async sendMessage () {
      this.progress = true
      const response = await sendMessage({ address: this.address, email: this.email, phone: `+61 ${this.phone}`, message: 'Full response test' })
      console.log(response)
      this.progress = false
      this.$emit('update:start', false)
    },

    startTest () {
      this.progress = true
      // const duration = 1000 * 60 * 3 + Math.random() * 1000 * 60 * 2
      return new Promise(resolve => setTimeout(() => resolve(), 5000))
    },

    finishTesting () {
      this.$emit('update:finish', true)
      this.$emit('update:start', false)
    }
  }
}
</script>
