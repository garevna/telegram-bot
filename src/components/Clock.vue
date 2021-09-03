<template>
  <span class="mr-4 mt-2">
    <small>{{ timerValue }}</small>
  </span>
</template>

<script>

export default {
  name: 'Clock',

  props: ['start', 'testNum'],

  data: () => ({
    startTime: 0,
    minutes: 0,
    seconds: 0,
    endMinutes: 0,
    endSeconds: 0
  }),

  computed: {
    timerValue () {
      return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`
    }
  },

  methods: {
    step () {
      this.minutes = Math.floor(((Date.now() - this.startTime) / 1000) / 60)
      this.seconds = Math.floor((Date.now() - this.startTime) / 1000) % 60
      if (Date.now() >= this.endTime) {
        this.minutes = this.endMinutes
        this.seconds = this.endSeconds
      }
      this.minutes < this.endMinutes ? requestAnimationFrame(this.step)
        : this.seconds < this.endSeconds ? requestAnimationFrame(this.step) : this.finishTesting()
    },

    finishTesting () {
      this.$emit('update:testNum', this.testNum + 1)
      this.$emit('update:start', false)
    }
  },

  mounted () {
    this.startTime = Date.now()
    this.endMinutes = 4 + Math.round(Math.random() * 2)
    this.endSeconds = Math.round(Math.random() * 59)

    this.endTime = this.startTime + this.endMinutes * 60 * 1000 + this.endSeconds * 1000

    requestAnimationFrame(this.step)
  }
}

</script>
