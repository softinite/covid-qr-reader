<template>
  <div>
    <b-container id="entryAccepted" v-show="$store.state.accepted">
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
    <b-container id="entryRejected" v-show="!$store.state.accepted">
      <b-row align-v="center" align-h="center">
        <b-col>
          <b-card title="Thank you for taking the questionnaire" class="">
            <b-card-header>We're sorry to hear your child may not attend Owen CLC today.</b-card-header>
            <b-card-body>
              <h5>{{reasonsLabel}}:</h5>
              <b-container>
                <b-row v-for="(reason, idx) in reasons" :key="idx" align-v="center" class="mt-2">
                  <b-col>
                    <b-img class="float-end" :src="reason.imageSrc" :alt="reason.title" :title="reason.title" width="60" height="55"/>
                  </b-col>
                  <b-col><span class="float-start">{{reason.title}}</span></b-col>
                </b-row>
              </b-container>
              <div class="mt-2"><small>Please feel free to close this window</small></div>
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
