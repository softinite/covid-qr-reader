<template>
  <div id="app">
    <h1 class="owen-title">Owen Community Learning Centre</h1>
    <h2>QR Code Scanner</h2>
    <CovidQuestionnaire/>
  </div>
</template>

<script>
import CovidQuestionnaire from './components/CovidQuestionnaire.vue'

export default {
  name: 'App',
  components: {
    CovidQuestionnaire
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.owen-title {
  color: #8373CE;
  font-family: 'Poppins', sans-serif;
  clear: both;
  font-size: 32px;
  margin: 0 0 5px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.01em;
}
</style>
