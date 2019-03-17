<template>
  <div class="hello">
    <h1>Zaloguj się</h1>
    <div class='row'>
    <div class='col-md-5'></div>
    <div class='col-md-2'>
       <input type="email" class='form-control' placeholder="Email...." v-model="email">
          <input type="password" class='form-control' style="margin-top:5px;" placeholder="Password...." v-model="password">
          <input type="submit" class="btn btn-primary btn-block" style="margin-top:5px;" value="Użyj Social ID" @click="useID()">
    </div>
    <div class='col-md-5'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
       email:"",
       password:""
    }
  },
  created(){
      if(localStorage.getItem('access_token',null) !=null){
         this.$router.push({name:"Dashboard",params:{}});
      }
  },
  methods:{
    async useID(){
        const loader = this.$loading.show(this.loader);
        await this.$store.dispatch('login',{email:this.email,password:this.password});
        loader.hide();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
