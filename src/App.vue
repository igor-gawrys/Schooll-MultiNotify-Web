<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async mounted(){
    const loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        height:128,
        width:128,
        color:"#08b274",
        loader:"dots"
    });
    await this.$store.dispatch('me');
    await this.$store.dispatch('grades');
    loader.hide();
  }
}
</script>

<style>

</style>
