<template>
  <div>
    <b-container id="questionnaire">
      <b-row>
        <b-col>
          <h2>COVID-19 Screening</h2>
          <div v-show="childName.length > 0">Child name: {{childName}}</div>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="center">
        <b-col>
          <identification-screen
              v-show="identificationInProgress"
              @id-confirmed="startQuestionnaire"
          />
          <question
              v-show="questionnaireInProgress"
              :title="questionTitle"
              :child-name="childName"
              :footnotes="questionFootnotes"
              :image-src="symptomImage"
              :image-title="questionSymptom"
              @yes="markSymptomAsPositive"
              @no="markSymptomAsNegative"
          />
          <final-screen v-show="questionnaireCompleted" :accepted="accepted" :reasons="abscenceReasons"/>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col class="fst-italic small">
          This tool has been created based on Toronto Public Health (TPH) <b-link href="https://www.toronto.ca/wp-content/uploads/2021/06/994c-Screening-Questionnaire-Child-Care-Day-Camp-School.pdf" target="_blank">Questionnaire</b-link>. In case of any contradictions with the latter,
          TPH version takes precedence.
        </b-col>
      </b-row>
    </b-container>
    <confirmation-popup
        :required-actions="popupRequiredActions"
        :bus="popupBus"
        @back="cancelLastSymptom"
        @acknowledged="notifyStaffAboutChildSymptoms"
    />
  </div>
</template>

<script>
import {questions} from '@/questions'
import Question from "@/components/Question";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import FinalScreen from "@/components/FinalScreen";
import IdentificationScreen from "@/components/IdentificationScreen";
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
  name: 'CovidQuestionnaire',
  components: {IdentificationScreen, FinalScreen, ConfirmationPopup, Question},
  props: {
  },
  data() {
    return {
      identificationInProgress: true,
      questionnaireInProgress: false,
      questionnaireCompleted: false,
      currentQuestion: 0,
      currentSymptom: 0,
      childId: null,
      childName: '',
      childSymptoms: [],
      accepted: false,
      popupRequiredActions: [],
      popupBus: new Vue(),
      abscenceReasons: []
    }
  },
  computed: {
    questionFootnotes() {
      return questions[this.currentQuestion].footnotes
    },
    questionSymptom() {
      return questions[this.currentQuestion].symptoms[this.currentSymptom].name
    },
    symptomImage() {
      return questions[this.currentQuestion].symptoms[this.currentSymptom].image
    },
    questionTitle() {
      return questions[this.currentQuestion].text
    }
  },
  methods: {
    showRequiredActionsForMildSymptom(symptom) {
      const homeHours = (symptom.actionCode === 'home48') ? 48 : 24
      this.popupRequiredActions = [
        {
          title: 'Stay home for ' + homeHours + ' hours',
          description: 'Stay home until symptoms improve for at least ' + homeHours + ' hours. Other household members do not have to self-isolate.',
          imageSrc: '/images/home.png'
        }
      ]
      this.popupBus.$emit('show')
    },
    notifyStaffAboutChildSymptoms() {
      console.log(this.childName + ' has ' + this.childSymptoms.map((s) => s.name).join(','))
      this.accepted = false
      this.rejected = true
      this.questionnaireInProgress = false
      this.questionnaireCompleted = true
      this.abscenceReasons = this.childSymptoms.map((s) => { return { title: s.name, imageSrc: s.image}})
      this.popupBus.$emit('hide')
    },
    cancelLastSymptom() {
      this.childSymptoms.pop()
      this.popupRequiredActions = []
      this.popupBus.$emit('hide')
    },
    markSymptomAsNegative() {
      const q = questions[this.currentQuestion]
      const isPartBQuestion = q.idx === 2
      const isLastSymptomForQuestion = this.currentSymptom === q.symptoms.length - 1
      if (isLastSymptomForQuestion === false) {
        this.currentSymptom++
      } else if (isPartBQuestion && this.childSymptoms.length > 0) {
        this.showRequiredActionsForMildSymptom(this.childSymptoms[0])
      } else if (this.currentQuestion < questions.length - 1) {
        this.currentQuestion++
        this.currentSymptom = 0
      } else {
        this.questionnaireInProgress = false
        this.questionnaireCompleted = true
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
        this.popupRequiredActions = requiredActionsForCovidSymptoms
        this.popupBus.$emit('show')
      } else if (isPartBQuestion) {
        const isLastSymptomFromThisQuestion = this.currentSymptom === q.symptoms.length - 1
        if (this.childSymptoms.length > 1) {
          this.popupRequiredActions = requiredActionsForCovidSymptoms
          this.popupBus.$emit('show')
        } else if (isLastSymptomFromThisQuestion) {
          this.showRequiredActionsForMildSymptom(symptom)
        } else {
          this.currentSymptom++
        }
      } else if (symptom.actionCode === 'testedPositive') {
        this.popupRequiredActions = requiredActionsWhenTestedPositive
        this.popupBus.$emit('show')
      } else if (symptom.actionCode === 'closeContact') {
        this.popupRequiredActions = [
          {
            title: 'Stay home & self-isolate.',
            description: 'Must self-isolate for 10 days from their last exposure.',
            imageSrc: '/images/home.png'
          }
        ]
        this.popupBus.$emit('show')
      } else if (symptom.actionCode === 'federalQuarantine') {
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
      }
    },
    startQuestionnaire(idInfo) {
      this.childId = idInfo
      this.childName = idInfo.name
      this.identificationInProgress = false
      this.currentQuestion = 0
      this.questionnaireInProgress = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
