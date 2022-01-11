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
              :child-name="childName"
              :question="currentQuestion"
              @nosymptoms="goToTheNextQuestion"
              @symptoms="goToRejectionScreen"
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
  </div>
</template>

<script>
import {questions} from '@/questions'
import Question from "@/components/Question";
import FinalScreen from "@/components/FinalScreen";
import IdentificationScreen from "@/components/IdentificationScreen";

export default {
  name: 'CovidQuestionnaire',
  components: {IdentificationScreen, FinalScreen, Question},
  props: {
  },
  data() {
    return {
      identificationInProgress: true,
      questionnaireInProgress: false,
      questionnaireCompleted: false,
      currentQuestion: questions[0],
      childInfo: null,
      childName: '',
      accepted: false,
      abscenceReasons: []
    }
  },
  methods: {
    goToRejectionScreen(symptoms) {
      this.accepted = false
      this.questionnaireInProgress = false
      this.questionnaireCompleted = true
      this.abscenceReasons = symptoms.map(s => { return { title: s.name, imageSrc: s.image} })
    },
    goToTheNextQuestion() {
      if (this.currentQuestion.idx < questions.length) {
        this.currentQuestion = questions[this.currentQuestion.idx]
      } else {
        this.accepted = true
        this.questionnaireInProgress = false
        this.questionnaireCompleted = true
      }
    },
    startQuestionnaire(idInfo) {
      this.childInfo = idInfo
      this.childName = idInfo.name
      this.identificationInProgress = false
      this.currentQuestion = questions[0]
      this.questionnaireInProgress = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
