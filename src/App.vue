<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async mounted(){
    const loader = this.$loading.show();
    await this.$store.dispatch('me');
    await this.$store.dispatch('grades');
    loader.hide();
  }
}
</script>

<style>

</style>
