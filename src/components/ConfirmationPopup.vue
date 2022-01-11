<template>
  <span>
      <b-modal
          id="confirmationModal"
          title="In order to help slow down the spread of COVID-19, the following actions are required"
          ok-title="Acknowledge & Notify Staff"
          cancel-title="Go back"
          @ok="$emit('acknowledged')"
          no-close-on-esc no-close-on-backdrop hide-header-close
      >
        <b-container>
          <b-row align-v="center" v-for="(requiredAction, idx) in requiredActions" :key="idx" class="mt-2">
            <b-col cols="2"><b-img :src="requiredAction.imageSrc" :alt="requiredAction.title" :title="requiredAction.title" width="60" height="55"/></b-col>
            <b-col cols="10">
              <b-button :id="'req-act-' + idx" variant="outline-dark">{{requiredAction.title}}</b-button>
              <b-tooltip :target="'req-act-' + idx" :title="requiredAction.description"></b-tooltip>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
  </span>
</template>

<script>

export default {
  name: 'ConfirmationPopup',
  props: {
    requiredActions: {
      required: true,
      type: Array
    },
    bus: {
      required: true,
      type: Object
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.bus.$on('show', () => this.$bvModal.show('confirmationModal'))
    this.bus.$on('hide', () => this.$bvModal.hide('confirmationModal'))
  }
}

</script>

<style scoped></style>
