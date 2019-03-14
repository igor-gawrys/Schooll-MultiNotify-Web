<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('me');
    this.$store.dispatch('grades');
  }
}
</script>

<style>

</style>
