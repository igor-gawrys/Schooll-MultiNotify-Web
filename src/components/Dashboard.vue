<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Witaj {{ $store.state.user.full_name }} !</p>
    <div class='row'>
    <div class='col-md-3'></div>
    <div class='col-md-6'>
    <div class='grades'>
    <div class='grade' v-for="grade in $store.state.grades" @click="()=>{ $router.push({name:'Grade',params:{grade:grade.id}}) }">
   {{grade.name}}
    </div>
     <div class='grade'>
   Dodaj klasę
    </div>
    </div>
    </div>
      <div class='col-md-3'></div>
    </div>
        <ul>
      <li>
        <a
          href="#logout"
          @click="logout()"
        >
         Wyloguj się
        </a>
      </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Panel zarządzania !'
    }
  },
  methods:{
    logout(){
       this.$store.dispatch('logout');
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
.grade {
      border: 2px solid #c5ccd8;
      border-radius: 0.25rem;
      padding-top:20px;
      padding-bottom:20px;
      margin-top:3px;
}
.grade:last-child {
   margin-bottom:20px;
}
.grade:hover{
  cursor:pointer;
}
</style>
