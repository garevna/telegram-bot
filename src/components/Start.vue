<template>
  <v-container class="homefone">
    <v-card flat class="transparent mx-auto" max-width="320">
      <v-card-text v-if="begin">
        <p>
          Please enter your full address, including the apartment/unit number
        </p>

        <table>
          <tr>
            <td width="200">
              <p>apartment/unit number</p>
            </td>
            <td width="80">
              <v-text-field
                v-model="appartmentNumber"
                outlined
                dense
              />
            </td>
          </tr>
        </table>

        <p>street number / street name / suburb / postcode</p>

        <GeoscapeAutocomplete :buildingAddress.sync="address" />

        <p class="mt-8">My service:</p>

        <v-radio-group v-model="serviceStatus">
          <v-radio label="Down" value="Down" />
          <v-radio label="Slow" value="Slow" />
          <v-radio label="Unstable" value="Unstable" />
        </v-radio-group>

        <v-row justify="center" class="mt-8">
          <v-btn
            text
            color="primary"
            :disabled="!appartmentNumber || !address || !serviceStatus"
            @click="sendMessage"
          >
            Start tests
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import { sendMessage } from '@/helpers'

import GeoscapeAutocomplete from '@/components/GeoscapeAutocomplete.vue'

export default {
  name: 'Start',

  components: {
    GeoscapeAutocomplete
  },

  props: ['begin', 'start'],

  data: () => ({
    appartmentNumber: '',
    address: '',
    serviceStatus: undefined
  }),

  methods: {
    sendMessage () {
      sendMessage({ address: `${this.appartmentNumber}/${this.address}`, service: this.serviceStatus })

      this.$emit('update:address', `${this.appartmentNumber}/${this.address}`)
      this.$emit('update:begin', false)
      this.$emit('update:start', true)
    }
  }
}
</script>
