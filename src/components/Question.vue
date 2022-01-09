<template>
  <div>
    <b-card :title="title">
      <b-card-body>
        <b-container>
          <b-row>
            <b-col>
              <b-img thumbnail fluid width="110" height="110" rounded :alt="imageTitle" :title="imageTitle" :src="imageSrc"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3>{{imageTitle}}</h3>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b-button variant="outline-danger" @click="userAnsweredYes">Yes</b-button>
            </b-col>
            <b-col>
              <b-button variant="primary" @click="userAnsweredNo">No</b-button>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-container>
              <b-row v-if="footnotes.length > 0">
                <b-col><b>FAQ:</b></b-col>
              </b-row>
              <b-row v-for="(footnote, idx) in footnotes" :key="idx">
                <b-col>
                  <b-button :id="'faq-' + idx" variant="outline-dark">{{footnote.label}}</b-button>
                  <b-tooltip :target="'faq-' + idx" :title="footnote.description"></b-tooltip>
                </b-col>
              </b-row>
            </b-container>
          </b-row>
        </b-container>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Question',
  props: {
    title: {
      required: true,
      type: String
    },
    imageTitle: {
      required: true,
      type: String
    },
    imageSrc: {
      required: true,
      type: String
    },
    childName: {
      required: true,
      type: String
    },
    footnotes: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    userAnsweredNo() {
      this.$emit('no')
    },
    userAnsweredYes() {
      this.$emit('yes')
    }
  }
}

</script>
