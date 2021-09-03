<template>
  <v-card-text style="max-height: 64px">
    <v-row align="center" v-for="(test, index) of tests" :key="index">
      <v-col cols="8">
        <v-checkbox
          v-if="start"
          v-model="test.value"
          :label="test.text"
          color="primary"
          hide-details
          readonly
        />
      </v-col>

      <v-col cols="4">
        <v-progress-circular
          v-if="test.progress"
          :indeterminate="test.progress"
          :active="test.progress"
          color="primary"
          class="mt-4"
        ></v-progress-circular>
      </v-col>

      <v-row v-if="test.progress" align="center" justify="center">
        <v-col cols="4">
          <Clock :start.sync="test.progress" :testNum.sync="testNum" />
        </v-col>
        <v-col cols="8">
          <small>{{ tests[testNum].tooltip }}</small>
        </v-col>
      </v-row>
    </v-row>

    <v-row justify="center">
      <v-btn
        v-if="testsFinished"
        text
        color="primary"
        class="my-8"
        @click="finishTesting"
      >
        Finish
      </v-btn>
    </v-row>

    <v-row v-if="testsFinished" justify="center">
      <v-divider class="my-8" />
      <p>
        If all 3 tests passed and your internet connection has not recovered, please run a <b>full response test</b>
      </p>

      <v-btn
        text
        color="primary"
        :disabled="!address"
        @click="startFullResponseTest"
      >
        Start full response test
      </v-btn>
    </v-row>
  </v-card-text>
</template>

<script>

import Clock from '@/components/Clock.vue'

export default {
  name: 'Tests',

  components: {
    Clock
  },

  props: ['start', 'address', 'fullResponseTest'],

  data: () => ({
    testsFinished: false,
    tests: [
      {
        text: 'Check connection',
        tooltip: 'Duration approximately 5 mins',
        progress: false,
        value: false
      },
      {
        text: 'Check line state',
        tooltip: 'Duration approximately 5 mins',
        progress: false,
        value: false
      },
      {
        text: 'Loopback test',
        tooltip: 'Duration approximately 5 mins',
        progress: false,
        value: false
      }
    ],
    testNum: 0
  }),

  watch: {
    testNum (val) {
      Object.assign(this.tests[val - 1], { progress: false, value: true })
      if (val < this.tests.length) Object.assign(this.tests[val], { progress: true })
      else this.testsFinished = true
    }
  },

  methods: {
    startFullResponseTest () {
      this.$emit('update:fullResponseTest', true)
      this.$emit('update:start', false)
    },

    finishTesting () {
      this.$emit('update:finish', true)
      this.$emit('update:start', false)
    }
  },

  mounted () {
    if (this.start) {
      this.tests[0].progress = true
      Object.assign(this.tests[0], { progress: true })
    }
  }
}
</script>
