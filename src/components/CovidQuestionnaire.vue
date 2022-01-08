<template>
  <div>
    <b-container>
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
    <div ref="modals">
      <b-modal
          id="homeAndIsolate"
          title="Selected symptom requires the following action(s)"
          ok-title="Acknowledge & Notify Staff"
          cancel-title="Go back"
          no-close-on-esc no-close-on-backdrop hide-header-close
      >
        <b-container>
          <b-row>
            <b-col cols="2"><b-img src="/images/home.png" alt="Stay home & self-isolate." title="Stay home & self-isolate."/></b-col>
            <b-col cols="8">Stay home & self-isolate.</b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="2"><b-img src="/images/household.png" alt="Your household including siblings must self-isolate, regardless of vaccination status." title="Your household including siblings must self-isolate, regardless of vaccination status."/></b-col>
            <b-col cols="8">Your household including siblings must self-isolate, regardless of vaccination status.</b-col>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal
          id="accepted"
          title="Excellent!"
          no-close-on-esc no-close-on-backdrop hide-footer hide-header-close size="sm"
      >
        <b-container>
          <b-row>
            <b-col><b-img src="/images/accepted.png" alt="Accepted" title="Accepted"/></b-col>
          </b-row>
          <b-row>
            <b-col class="text-green"><b>You're good to go!</b></b-col>
          </b-row>
        </b-container>
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
      childSymptoms: []
    }
  },
  computed: {
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
    markQuestionnaireAsFilled() {

    },
    markSymptomAsNegative() {
      if (this.currentSymptom < questions[this.currentQuestion].symptoms.length - 1) {
        this.currentSymptom++
      } else if (this.currentQuestion < questions.length - 1) {
        this.currentQuestion++
        this.currentSymptom = 0
      } else {
        this.$bvModal.show('accepted')
      }
    },
    markSymptomAsPositive() {
      const symptom = questions[this.currentQuestion].symptoms[this.currentSymptom]
      this.childSymptoms.push(symptom)
      this.$bvModal.show(symptom.actionCode)
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
