<template>
  <div class="hello">
  <b-modal ref="updateGrade" hide-footer title="Edytuj klasę">
      <div class="d-block text-center">
       <div>
        <input type="text" class="form-control" placeholder="Nazwa" v-model="grade.name">
       </div>
      </div>
      <b-button class="mt-3" variant="outline-warning" block @click="updateGrade()">Zaktualizuj !</b-button>
  </b-modal>
    <h1>Klasa {{this.grade.name}} !</h1>
    <p>Witaj {{ $store.state.user.full_name }} !</p>
        <div class='row'>
    <div class='col-md-3'></div>
    <div class='col-md-6'>
    <div class='grades'>
         <div class='grade' v-for="notification in grade.notifications" @click="()=>{ $router.push({name:'Notification',params:{notification:notification.id}}) }">
   {{notification.content.substr(0,20)}}......
    </div>
     <div class='grade' @click="createNotification()">
   Dodaj powiadomienie
    </div>
     <div class='grade'>
   Integracje
    </div>
    <div class='grade delete' @click="deleteGrade()">
    Skasuj
    </div>
    <div class='grade edit' @click="()=>{ $refs.updateGrade.show() }">
    Edycja
    </div>
     <div class='grade' @click="()=>{ $router.push({name:'Dashboard',params:{}}) }">
   <= wróć
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
  name: 'Grade',
  data () {
    return {
      grade:{}
    }
  },
  created(){
     axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
        this.grade = response.data.data;
     });
  },
  methods:{
    logout(){
       this.$store.dispatch('logout');
    },
    deleteGrade(){
      if(confirm("Czy jesteś pewien że chcesz usunąć ?")){
       axios.delete('auth/grades/'+this.grade.id).then((response)=>{
         this.$store.dispatch('grades');
         this.$router.back();
       });
      }
    },
    createNotification(){
        let content = prompt("Wpisz treść powiadomienia !");
        if(content !=""){
         axios.post('auth/notifications',{content:content,grade_id:this.grade.id}).then((response)=>{
            axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
             this.grade = response.data.data;
           });
           alert(response.data.message);
         });
        }
    },
    updateGrade(){
      axios.patch('auth/grades/'+this.grade.id,{name:this.grade.name,color:"#fffff"}).then((response)=>{
          this.grade.name = "";
           axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
            this.grade = response.data.data;
           });
          this.$store.dispatch('grades');
          this.$refs.updateGrade.hide();
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
.delete:hover {
    background-color:rgb(119, 40, 11,0.5);
    color:white;
}
.edit:hover {
    background-color:rgb(232,70,11,0.5);
    color:white;
}
</style>
