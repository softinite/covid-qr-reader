<template>
  <div>
    <b-container id="questionnaire">
      <b-row>
        <b-col>
          <h2>COVID-19 Screening</h2>
          <div v-show="$store.state.childInfo.name.length > 0">{{$store.state.childInfo.name}}</div>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="center">
        <b-col>
          <identification-screen v-show="$store.state.identificationInProgress" />
          <question
              v-show="$store.state.questionnaireInProgress"
              :question="currentQuestion"
              @nosymptoms="goToTheNextQuestion"
              @symptoms="goToRejectionScreen"
              @previous="goBack"
          />
          <final-screen v-show="$store.state.completed" :reasons="absenceReasons"/>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col class="fst-italic small">
          This tool has been created based on Toronto Public Health (TPH) <b-link href="https://www.toronto.ca/wp-content/uploads/2021/06/994c-Screening-Questionnaire-Child-Care-Day-Camp-School.pdf" target="_blank">Questionnaire</b-link>. In case of any contradictions with the latter,
          TPH version takes precedence.
        </b-col>
      </b-row>
      <b-row>
        <b-col class="small"><b-link target="_blank" href="https://www.termsfeed.com/live/77f44020-2092-448f-9003-f27845a88155">Privacy Policy</b-link></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Question from "@/components/Question";
import FinalScreen from "@/components/FinalScreen";
import IdentificationScreen from "@/components/IdentificationScreen";

export default {
  name: 'CovidQuestionnaire',
  components: {IdentificationScreen, FinalScreen, Question},
  data() {
    return {
      allQuestions: this.$store.state.questions,
      currentQuestion: this.$store.state.questions[0],
      absenceReasons: []
    }
  },
  methods: {
    goBack() {
      if (this.currentQuestion.idx > 1) {
        this.currentQuestion = this.allQuestions[this.currentQuestion.idx - 2]
      }
    },
    goToRejectionScreen(symptoms) {
      this.$store.dispatch('notifyChildIsUnwell', symptoms.map(s => s.name))
      this.absenceReasons = symptoms.map(s => { return { title: s.name, imageSrc: s.image} })
    },
    goToTheNextQuestion() {
      if (this.currentQuestion.idx < this.allQuestions.length) {
        this.currentQuestion = this.allQuestions[this.currentQuestion.idx]
      } else {
        this.$store.dispatch('notifyChildIsWell')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
