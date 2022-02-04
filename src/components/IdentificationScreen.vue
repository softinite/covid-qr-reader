<template>
  <div>
    <b-card title="Child Identification">
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
  </div>
</template>

<script>
import QrScanner from 'qr-scanner'
import qrScannerWorkerSource from '!!raw-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';

QrScanner.WORKER_PATH = URL.createObjectURL(new Blob([qrScannerWorkerSource]));

export default {
  name: 'IdentificationScreen',
  data() {
    return {
      scanInProgress: false,
      cameraAvailable: false,
      cameraMsg: 'Checking camera if camera is available...',
      qrCode: null,
      qrScanner: null,
      errorMessage: null,
    }
  },
  methods: {
    validateCode() {
      if (this.isQrCodeValid()) {
        this.$store.dispatch('fetchChildInfo', this.qrCode).catch((err) => this.errorMessage = err)
      } else {
        this.errorMessage = 'Invalid code'
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
  },
  computed: {
    codeNotProvided() {
      return !this.qrCode || !this.qrCode.length
    }
  },
  mounted() {
    const codeFromUrl = new URL(location.href).searchParams.get('code')
    if (codeFromUrl && codeFromUrl.length >= 10) {
      this.qrCode = codeFromUrl
      this.validateCode()
    } else {
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
}

</script>
