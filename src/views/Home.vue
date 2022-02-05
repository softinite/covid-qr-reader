<template>
  <div class="home">
    <h1 class="owen-title">Owen Community Learning Centre</h1>
    <CovidQuestionnaire/>
  </div>
</template>

<script>
// @ is an alias to /src
import CovidQuestionnaire from '@/components/CovidQuestionnaire.vue'

export default {
  name: 'Home',
  components: {
    CovidQuestionnaire
  }
}
</script>
