<template>
  <div>
    <b-container id="questionnaire" v-if="!accepted && !rejected">
      <b-row>
        <b-col>
          <h2 v-if="questionnaireInProgress">Questionnaire for {{childName}}</h2>
          <h2 v-else>QR Code Scanner</h2>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="center">
        <b-col>
          <b-card title="Child Identification" v-show="showIdRequestScreen">
            <b-card-body>
              <b-container>
                <b-row>
                  <b-col>
                    <span class="font-weight-bold text-danger" v-show="errorMessage">{{errorMessage}}</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-button :disabled="!cameraAvailable" :title="cameraMsg" variant="outline-primary" @click="startScanner">Read QR code</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-col class="font-weight-bold text-black">OR</b-col>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-col><b-form-input v-model="qrCode" placeholder="Enter code manually" @input="codeUpdatedManually"></b-form-input></b-col>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col><b-button variant="primary" :disabled="codeNotProvided" @click="validateCode">Go</b-button></b-col>
                </b-row>
              </b-container>
            </b-card-body>
          </b-card>
          <div v-show="scanInProgress">
            <video ref="scanner" width="420"></video>
            <div>
              <b-button :disabled="!cameraAvailable" :title="cameraMsg" variant="outline-primary" @click="stopScanner">Stop</b-button>
            </div>
          </div>
          <b-card :title="questionTitle" v-show="questionnaireInProgress">
            <b-card-body>
              <b-container>
                <b-row>
                  <b-col>
                    <b-img thumbnail fluid width="110" height="110" rounded :alt="questionSymptom" :title="questionSymptom" :src="symptomImage"/>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <h3>{{questionSymptom}}</h3>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <b-button variant="outline-danger" @click="markSymptomAsPositive">Yes</b-button>
                  </b-col>
                  <b-col>
                    <b-button variant="primary" @click="markSymptomAsNegative">No</b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-container>
                    <b-row v-for="footprint in questionFootprints" :key="footprint">
                      <b-col><small>* {{footprint}}</small></b-col>
                    </b-row>
                  </b-container>
                </b-row>
              </b-container>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-container id="entryAccepted" v-if="accepted">
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
    <div ref="modals">
      <b-modal
          id="homeAndIsolate"
          :title="symptomsPresentTitle"
          ok-title="Acknowledge & Notify Staff"
          cancel-title="Go back"
          @cancel="removeLastSymptomAndCloseHomeAndIsolate"
          no-close-on-esc no-close-on-backdrop hide-header-close
      >
        <b-container>
          <b-row>
            <b-col>
              <h5>In order to help slow down the spread of COVID-19, the following actions are required:</h5>
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col cols="2"><b-img src="/images/home.png" alt="Stay home & self-isolate." title="Stay home & self-isolate."/></b-col>
            <b-col cols="10">
              <h4>Stay home & self-isolate.</h4>
              <div>Please see more details below.</div>
              <b-list-group>
                <b-list-group-item>
                  <b-container>
                    <b-row>
                      <b-col><b>If child is immune compromised:</b></b-col>
                      <b-col>
                        <small>Must self-isolate for 10 days from the
                        day their symptoms started, or longer
                          if symptoms last longer than 10 days</small>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col><b>All others:</b></b-col>
                      <b-col>
                        <small>Must self-isolate for at least 5 days
                          from the day symptoms started
                          and until symptoms have been
                          improving for 24 hours (or 48
                          hours if nausea/vomiting/diarrhea),
                          whichever is longer</small>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-list-group-item>
                <b-list-group-item><small>Use test date if no symptoms</small></b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="2"><b-img src="/images/household.png" alt="Your household including siblings must self-isolate, regardless of vaccination status." title="Your household including siblings must self-isolate, regardless of vaccination status."/></b-col>
            <b-col cols="10">Your household including siblings must self-isolate, regardless of vaccination status.</b-col>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal
          id="home24"
          :title="symptomsPresentTitle"
          ok-title="Acknowledge & Notify Staff"
          cancel-title="Go back"
          no-close-on-esc no-close-on-backdrop hide-header-close
          @cancel="removeLastSymptomAndCloseHome24"
      >
        <b-container>
          <b-row>
            <b-col>
              <h5>In order to help slow down the spread of COVID-19, the following actions are required:</h5>
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col cols="2"><b-img src="/images/home.png" alt="Stay home." title="Stay home."/></b-col>
            <b-col cols="10">{{childName}} must stay home for <b>{{homeHours}}</b> hours.</b-col>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal
          id="federalQuarantine"
          title="We're not sure"
          ok-title="Acknowledge & Notify Staff"
          cancel-title="Go back"
          @cancel="removeLastSymptomAndCloseFederalQuarantine"
          no-close-on-esc no-close-on-backdrop hide-header-close
      >
          Please check with the latest guidelines from the federal government to see whether {{childName}} can attend Owen CLC today.
          They can be found at the following <b-link target="_blank" href="https://travel.gc.ca/travel-covid/travel-restrictions/exemptions">link</b-link>.
      </b-modal>
    </div>
  </div>
</template>

<script>
import QrScanner from 'qr-scanner'
import {questions} from '@/questions'
import qrScannerWorkerSource from '!!raw-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';
QrScanner.WORKER_PATH = URL.createObjectURL(new Blob([qrScannerWorkerSource]));

export default {
  name: 'CovidQuestionnaire',
  props: {
  },
  data() {
    return {
      scanInProgress: false,
      cameraAvailable: false,
      questionnaireInProgress: false,
      cameraMsg: 'Checking camera if camera is available...',
      qrCode: null,
      qrScanner: null,
      errorMessage: null,
      currentQuestion: 0,
      currentSymptom: 0,
      childName: null,
      childSymptoms: [],
      accepted: false,
      rejected: false,
      homeHours: 24
    }
  },
  computed: {
    symptomsPresentTitle() {
      return 'We\'re sorry to hear that ' + this.childName + ' is feeling unwell'
    },
    questionFootprints() {
      return questions[this.currentQuestion].footprints
    },
    questionSymptom() {
      return questions[this.currentQuestion].symptoms[this.currentSymptom].name
    },
    symptomImage() {
      return questions[this.currentQuestion].symptoms[this.currentSymptom].image
    },
    questionTitle() {
      return questions[this.currentQuestion].text
    },
    showIdRequestScreen() {
      return !this.scanInProgress && !this.questionnaireInProgress
    },
    codeNotProvided() {
      return !this.qrCode || !this.qrCode.length
    }
  },
  methods: {
    removeLastSymptomAndCloseHomeAndIsolate() {
      this.childSymptoms.pop()
      this.$bvModal.hide('homeAndIsolate')
    },
    removeLastSymptomAndCloseFederalQuarantine() {
      this.childSymptoms.pop()
      this.$bvModal.hide('federalQuarantine')
    },
    removeLastSymptomAndCloseHome24() {
      this.childSymptoms.pop()
      this.$bvModal.hide('home24')
    },
    markSymptomAsNegative() {
      const q = questions[this.currentQuestion]
      const isPartBQuestion = q.idx === 2
      const isLastSymptomForQuestion = this.currentSymptom === q.symptoms.length - 1
      if (isLastSymptomForQuestion === false) {
        this.currentSymptom++
      } else if (isPartBQuestion && this.childSymptoms.length > 0) {
        this.homeHours = (this.childSymptoms[0].actionCode === 'home24') ? 24 : 48
        this.$bvModal.show('home24')
      } else if (this.currentQuestion < questions.length - 1) {
        this.currentQuestion++
        this.currentSymptom = 0
      } else {
        this.accepted = true
      }
    },
    markSymptomAsPositive() {
      const q = questions[this.currentQuestion]
      const isPartBQuestion = q.idx === 2
      const symptom = q.symptoms[this.currentSymptom]
      this.childSymptoms.push(symptom)
      const homeAndIsolate = 'homeAndIsolate';
      if (symptom.actionCode === homeAndIsolate) {
        this.$bvModal.show(symptom.actionCode)
      } else if (isPartBQuestion) {
        const isLastSymptomFromThisQuestion = this.currentSymptom === q.symptoms.length - 1
        if (this.childSymptoms.length > 1) {
          this.$bvModal.show(homeAndIsolate)
        } else if (isLastSymptomFromThisQuestion) {
          this.homeHours = (symptom.actionCode === 'home48') ? 48 : 24
          this.$bvModal.show('home24')
        } else {
          this.currentSymptom++
        }
      } else if (symptom.actionCode === 'federalQuarantine') {
        this.$bvModal.show(symptom.actionCode)
      }
    },
    receiveScanCode(code) {
      this.qrCode = code
      this.scanInProgress = false
      this.qrScanner.stop()
      this.validateCode()
    },
    codeUpdatedManually() {
      this.errorMessage = null
    },
    stopScanner() {
      this.qrScanner.stop()
      this.scanInProgress = false
    },
    startScanner() {
      this.scanInProgress = true
      this.errorMessage = null
      this.qrScanner.start()
    },
    isQrCodeValid() {
      return this.qrCode && this.qrCode.length >= 10
    },
    startQuestionnaire() {
      this.currentQuestion = 0
      this.questionnaireInProgress = true
    },
    validateCode() {
      if (this.isQrCodeValid()) {
        this.childName = 'Joanne Doe'
        this.startQuestionnaire()
      } else {
        this.errorMessage = 'Invalid code'
      }
    }
  },
  mounted() {
    QrScanner
        .hasCamera()
        .then((result) => {
          if (result === true) {
            this.cameraMsg = 'Start scanning'
            this.cameraAvailable = true
            this.qrScanner = new QrScanner(this.$refs['scanner'], this.receiveScanCode)
          } else {
            this.cameraMsg = 'Camera not available'
          }
        })
        .catch((err) => {
          this.cameraMsg = err;
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
