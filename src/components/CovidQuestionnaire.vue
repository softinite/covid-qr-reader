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
                    <b-img thumbnail fluid width="420" :alt="questionSymptom" :title="questionSymptom" :src="questionImage"/>
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
      currentQuestion: 0,
      childName: null
    }
  },
  computed: {
    questionSymptom() {
      return questions[this.currentQuestion].symptom
    },
    questionImage() {
      return questions[this.currentQuestion].imageSrc
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
      return this.qrCode && this.qrCode.length === 10
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
