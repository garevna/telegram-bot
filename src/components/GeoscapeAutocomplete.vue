<template>
    <v-row justify="center">
      <v-autocomplete
        v-model="address"
        :loading="loading"
        :items="addresses"
        :search-input.sync="search"
        cache-items
        class="mx-2"
        flat
        hide-no-data
        hide-details
        placeholder="Enter the address"
        outlined
        clearable
        :menu-props="{ bottom: true, offsetY: true }"
      />
    </v-row>
</template>

<script>

import { getVariants } from '@/helpers'

export default {
  name: 'GeoscapeAutocomplete',

  props: ['buildingAddress'],

  data: () => ({
    address: '',
    addressDetails: null,
    variants: [],
    loading: false,
    search: null
  }),

  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },

  watch: {
    search (val) {
      val && val !== this.select && this.getVariants(val)
    },
    address (val) {
      this.$emit('update:buildingAddress', this.address)
    }
  },

  methods: {
    receiveVariants: getVariants,

    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = await this.receiveVariants(val)
      this.loading = false
    }
  }
}
</script>
