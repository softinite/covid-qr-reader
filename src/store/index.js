import Vue from 'vue'
import Vuex from 'vuex'
import {questions} from "@/questions";
import ApiService from '@/service/api-service'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        questions: questions,
        childInfo: {name: '', code: ''},
        completed: false,
        accepted: false,
        identificationInProgress: true,
        questionnaireInProgress: false
    },
    mutations: {
      REJECTED(state) {
        state.accepted = false
      },
      ACCEPTED(state) {
        state.accepted = true
      },
      QUESTIONNAIRE_COMPLETED(state) {
        state.questionnaireInProgress = false
        state.completed = true
      },
      SET_CHILD_INFO(state, info) {
        state.childInfo = info
        state.identificationInProgress = false
        state.questionnaireInProgress = true
      }
    },
    actions: {
        fetchChildInfo(context, code) {
            return ApiService
                .fetchChildInfo(code)
                .then((info) => {
                    info.code = code
                    context.commit('SET_CHILD_INFO', info)
                })
        },
        notifyChildIsWell(context) {
          context.commit('QUESTIONNAIRE_COMPLETED')
          return ApiService
              .notifyChildIsWell(context.state.childInfo.code)
              .then(() => context.commit('ACCEPTED'))
        },
        notifyChildIsUnwell(context, symptomNames) {
          context.commit('QUESTIONNAIRE_COMPLETED')
          return ApiService
              .notifyChildIsUnwell(context.state.childInfo.code, symptomNames)
              .then(() => context.commit('REJECTED'))
        }
    },
    modules: {}
})
