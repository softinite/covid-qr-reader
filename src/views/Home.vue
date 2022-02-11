<template>
  <div class="home">
    <h1 class="owen-title">Owen Community Learning Centre</h1>
    <CovidQuestionnaire v-if="userAgreedToTerms"/>
    <div v-show="conditionsVerified && !userAgreedToTerms">We're sorry to hear that our terms do not work for you. Please feel free reaching out to admin@owenclc.com or Owen CLC Administration for any questions or concerns.</div>
    <b-modal id="termsModal" title="Terms and conditions" ok-title="Accept" cancel-title="Reject" @ok="acceptConditions" @cancel="rejectedConditions"
             no-close-on-backdrop no-close-on-esc hide-header-close>
      Please accept <b-link target="_blank" href="https://www.termsfeed.com/live/4a3e2e98-ddf5-4acf-8f80-b326a241570a">Terms & Conditions</b-link>.
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import CovidQuestionnaire from '@/components/CovidQuestionnaire.vue'

const agreementKey = 'qr.owenclc.agreement';

export default {
  name: 'Home',
  data() {
    return {
      userAgreedToTerms: false,
      conditionsVerified: false
    }
  },
  components: {
    CovidQuestionnaire
  },
  methods: {
    acceptConditions() {
      this.conditionsVerified = true
      this.userAgreedToTerms = true
      localStorage.setItem(agreementKey, 'true')
    },
    rejectedConditions() {
      this.conditionsVerified = true
      this.userAgreedToTerms = false
      localStorage.setItem(agreementKey, 'false')
    }
  },
  mounted() {
    const userAgreed = localStorage.getItem(agreementKey)
    if (userAgreed !== 'true') {
      this.$bvModal.show('termsModal')
    } else {
      this.userAgreedToTerms = true
    }
  },
}
</script>
