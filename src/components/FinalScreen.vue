<template>
  <div>
    <b-container id="entryAccepted" v-show="accepted">
      <b-row align-v="center" align-h="center">
        <b-col>
          <b-card title="Thank you for taking the questionnaire">
            <b-card-header>You are welcome to proceed</b-card-header>
            <b-card-body>
              <div>
                <b-img src="/images/accepted.png" alt="Accepted" title="Accepted"/>
              </div>
              <div><small>Please feel free to close this window</small></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-container id="entryRejected" v-show="!accepted">
      <b-row align-v="center" align-h="center">
        <b-col>
          <b-card title="Thank you for taking the questionnaire">
            <b-card-header>We're sorry to hear your child may not attend Owen CLC today.</b-card-header>
            <b-card-body>
              <h5>{{reasonsLabel}}:</h5>
              <div v-for="(reason, idx) in reasons" :key="idx">
                <b-img :src="reason.imageSrc" :alt="reason.title" :title="reason.title" width="60" height="55"/>
                {{reason.title}}
              </div>
              <b-container>
                <b-row >
                  <b-col>
                  </b-col>
                  <b-col></b-col>
                </b-row>
              </b-container>
              <div><small>Please feel free to close this window</small></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'FinalScreen',
  props: {
    accepted: {
      required: true,
      type: Boolean
    },
    reasons: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  computed: {
    reasonsLabel() {
      return (this.reasons.length > 1) ? 'Reasons' : 'Reason'
    }
  }
}

</script>
