<template>
  <div>
    <b-card :title="question.text">
      <b-card-body>
        <b-container>
          <b-row align-v="center" align-h="center" v-for="(symptom, idx) in question.symptoms" :key="idx" class="mb-4">
            <b-col class="min-vw-100">
              <b-container>
                <b-row>
                  <b-col><b>{{symptom.name}}</b></b-col>
                </b-row>
                <b-row align-v="center">
                  <b-col>
                    <b-form-group class="float-end">
                      <b-form-radio-group
                          v-model="yes[idx]"
                          :options="['Yes', 'No']"
                          :name="'symptom-' + idx"
                          plain
                          stacked
                          class=""
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-img class="float-start" thumbnail fluid width="110" height="110" rounded :alt="symptom.name" :title="symptom.name" :src="symptom.image"/>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row>
            <b-col><b-button variant="outline-dark" @click="$emit('previous')" v-show="question.idx > 1">Previous</b-button></b-col>
            <b-col><b-button variant="primary" :disabled="thereAreUnselectedSymptoms" @click="validateAndSubmit">Next</b-button></b-col>
          </b-row>
          <b-row>
            <b-container>
              <b-row v-show="footnotesPresent">
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
    <confirmation-popup
        :required-actions="popupRequiredActions"
        :bus="popupBus"
        @acknowledged="symptomsConfirmed"
    />
  </div>
</template>

<script>
import ConfirmationPopup from "@/components/ConfirmationPopup";
import Vue from 'vue'

const requiredActionsForCovidSymptoms = [
  {
    title: 'Stay home & self-isolate.',
    description: 'If child is immune compromised, then he/she must self-isolate for 10 days from the day their symptoms started, or longer' +
        ' if symptoms last longer than 10 days. ' +
        'Otherwise, she/he must self-isolate for at least 5 days from the day symptoms started and until symptoms have been ' +
        'improving for 24 hours (or 48 hours if nausea/vomiting/diarrhea), whichever is longer.',
    imageSrc: '/images/home.png'
  },
  {
    title: 'Your household including siblings must self-isolate, regardless of vaccination status.',
    description: 'Your household including siblings must self-isolate, regardless of vaccination status.',
    imageSrc: '/images/household.png'
  }
]

const requiredActionsWhenTestedPositive = [
  {
    title: requiredActionsForCovidSymptoms[0].title,
    description: requiredActionsForCovidSymptoms[0].description + ' Use test date if no symptoms.',
    imageSrc: requiredActionsForCovidSymptoms[0].imageSrc
  },
  {
    title: requiredActionsForCovidSymptoms[1].title,
    description: requiredActionsForCovidSymptoms[1].description,
    imageSrc: requiredActionsForCovidSymptoms[1].imageSrc
  }
]

export default {
  name: 'Question',
  components: {ConfirmationPopup},
  props: {
    question: {
      required: true,
      type: Object
    }
  },
  watch: {
    question: function(newQuestion) {
      this.yes = newQuestion.symptoms.map(() => '')
    }
  },
  data() {
    return {
      yes: this.question.symptoms.map( () => ''),
      popupRequiredActions: [],
      popupBus: new Vue()
    }
  },
  methods: {
    setupRequiredActionsAndShowConfirmationPopup() {
      const q = this.question
      const confirmedSymptoms = q.symptoms.filter((s, idx) => this.yes[idx] === 'Yes')
      if (q.idx === 1 || (q.idx === 2 && confirmedSymptoms.length > 1)) {
        this.popupRequiredActions = requiredActionsForCovidSymptoms
        this.popupBus.$emit('show')
      } else if (q.idx === 2) {
        const homeHours = (confirmedSymptoms[0].actionCode === 'home48') ? 48 : 24
        this.popupRequiredActions = [
          {
            title: 'Stay home for ' + homeHours + ' hours',
            description: 'Stay home until symptoms improve for at least ' + homeHours + ' hours. Other household members do not have to self-isolate.',
            imageSrc: '/images/home.png'
          }
        ]
        this.popupBus.$emit('show')
      } else if (q.idx === 3) {
        this.popupRequiredActions = requiredActionsWhenTestedPositive
        this.popupBus.$emit('show')
      } else if (q.idx === 4) {
        this.popupRequiredActions = [
          {
            title: 'Stay home & self-isolate.',
            description: 'Must self-isolate for 10 days from their last exposure.',
            imageSrc: '/images/home.png'
          }
        ]
        this.popupBus.$emit('show')
      } else if (q.idx === 5) {
        this.popupRequiredActions = [
          {
            title: 'Follow federal quarantine travel rules.',
            description: 'The child/student must follow federal requirements for quarantine and testing after returning from international travel.' +
                ' If the child/student is not fully vaccinated, they are not to attend school/child care for 14 days, even if they traveled with a vaccinated companion. ' +
                'Federal travel rules can be accessed at the following link https://travel.gc.ca/travel-covid/travel-restrictions/exemptions',
            imageSrc: '/images/travel_rules.png'
          }
        ]
        this.popupBus.$emit('show')
      } else {
        console.error('Unrecognized question', q)
      }
    },
    symptomsConfirmed() {
      const confirmedSymptoms = this.question.symptoms.filter((s, idx) => this.yes[idx] === 'Yes')
      this.popupBus.$emit('hide')
      this.$emit('symptoms', confirmedSymptoms)
    },
    validateAndSubmit() {
      if (this.yes.indexOf('Yes') >= 0) {
        this.setupRequiredActionsAndShowConfirmationPopup()
      } else {
        this.$emit('nosymptoms')
      }
    }
  },
  computed: {
    thereAreUnselectedSymptoms() {
      return this.yes.indexOf('') >= 0
    },
    footnotes() {
      return this.question.footnotes
    },
    footnotesPresent() {
      return this.question.footnotes.length > 0
    }
  }
}

</script>
