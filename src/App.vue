<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { List } from 'vant'
import Vue from 'vue'
Vue.use(List)

export default {
  name: 'App'
}
</script>

<style>
#app {
  background-color: #f0f0f0;
}
</style>
