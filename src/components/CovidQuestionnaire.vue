<template>
  <div>
    <b-container>
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
                  <b-col><b-button :disabled="!cameraAvailable" :title="cameraMsg" variant="outline-primary" @click="startScanner">Scan QR code</b-button></b-col>
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
          <video ref="scanner"></video>
          <b-card :title="questionTitle" v-show="questionnaireInProgress">
            <b-card-body>
              <b-container>
                <b-row>
                  <b-col>
                    <b-img alt="fever" title="fever" src="https://startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.chop.edu%2Fsites%2Fdefault%2Ffiles%2Fhealth-tips-my-child-has-a-fever-now-what-16x9.jpg&sp=1641513209T62e5c4d1f67cfbbbd2ddcd6b230aa8b9c80e0ab12ef80812f73dfc4358953eb3"/>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <b-button variant="outline-danger">Yes</b-button>
                  </b-col>
                  <b-col>
                    <b-button variant="primary">No (next question)</b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
      currentQuestion: 0
    }
  },
  computed: {
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
    codeUpdatedManually() {
      this.errorMessage = null
    },
    startScanner() {
      this.scanInProgress = true
      this.errorMessage = null
      this.qrScanner.start()
    },
    isQrCodeValid() {
      return this.qrCode && this.qrCode.length === 10
    },
    startQuestionnaire() {
      this.currentQuestion = 0
      this.questionnaireInProgress = true
    },
    validateCode() {
      if (this.isQrCodeValid()) {
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
            this.qrScanner = new QrScanner(this.$refs['scanner'], result => this.qrCode = result)
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
