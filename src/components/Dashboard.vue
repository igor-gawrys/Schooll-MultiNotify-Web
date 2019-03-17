<template>
  <div class="hello">
  <b-modal ref="createGrade" hide-footer title="Dodaj klasę">
      <div class="d-block text-center">
       <div>
        <input type="text" class="form-control" placeholder="Nazwa" v-model="grade.name">
       </div>
      </div>
      <b-button class="mt-3" variant="outline-success" block @click="createGrade()">Utwórz !</b-button>
  </b-modal>
    <h1>{{ msg }}</h1>
    <p>Witaj {{ $store.state.user.full_name }} !</p>
    <div class='row'>
    <div class='col-md-3'></div>
    <div class='col-md-6'>
    <div class='grades'>
    <div class='grade' v-for="grade in $store.state.grades" @click="()=>{ $router.push({name:'Grade',params:{grade:grade.id}}) }">
   {{grade.name}}
    </div>
     <div class='grade' @click="()=>{  $refs.createGrade.show() }">
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
      msg: 'Panel zarządzania !',
      grade:{
        name:""
      }
    }
  },
  methods:{
    logout(){
       this.$store.dispatch('logout');
    },
    createGrade(){
      const loader = this.$loading.show(this.loader);
      axios.post('auth/grades',{name:this.grade.name,color:"#fffff"}).then((response)=>{
          this.grade.name = "";
          this.$store.dispatch('grades');
          this.$refs.createGrade.hide();
          loader.hide();
      });
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
