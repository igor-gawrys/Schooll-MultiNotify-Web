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
  <b-modal ref="integrations" hide-footer title="Integracje">
      <div class="d-block text-center">
       <div>
        <h6>Skorzystaj z BOTA który powiadamia cię w każdej chwili !</h6>
        <p><a href="https://m.me/311708832870884">Messenger MultiNotify BOT</a></p>
        <p>1.rejestracja</p>
        <p>2.{klasa}</p>
        <p>Gotowe !</p>
        <p>w przypadku chęci wyrejestrowania należy wpisać 'wyrejestruj'</p>
         <h6>powiadomienia możesz otrzymywać także na email</h6>
       </div>
      </div>
  </b-modal>
  <b-modal ref="emails" hide-footer title="Adresy e-mail">
      <div class="d-block text-center">
       <div>
        <h6>Powiadomienia email !</h6>
        <span>
        <p v-for="mail in grade.mails">{{mail.name}} || {{mail.email}} || <a href="#delete" @click="deleteMail(mail)">x</a></p>
        </span>
        <b-button class="mt-3" variant="outline-success" block @click="()=>{ $refs.createMail.show() }">Dodaj E-mail !</b-button>
       </div>
      </div>
  </b-modal>
  <b-modal ref="createMail" hide-footer title="Tworzenie adresu E-mail">
       <div>
        <input type="text" class="form-control" placeholder="Nazwa" v-model="mail.name">
        <input type="email" class="form-control mt-1" placeholder="E-mail" v-model="mail.email">
       </div>
      <b-button class="mt-3" variant="outline-success" block @click="createMail()">Utwórz !</b-button>
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
     <div class='grade' @click="()=>{ $refs.integrations.show() }">
   Integracje
    </div>
    <div class='grade' @click="()=>{ $refs.emails.show() }">
   Adresy E-mail
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
      grade:{},
      mail:{
        name:"",
        email:""
      }
    }
  },
  created(){
    const loader = this.$loading.show();
     axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
        this.grade = response.data.data;
        loader.hide();
     });
  },
  methods:{
    logout(){
       this.$store.dispatch('logout');
    },
    deleteGrade(){
      const loader = this.$loading.show();
      if(confirm("Czy jesteś pewien że chcesz usunąć ?")){
       axios.delete('auth/grades/'+this.grade.id).then((response)=>{
         this.$store.dispatch('grades');
         loader.hide();
         this.$router.back();
       });
      }
    },
    createNotification(){
        const loader = this.$loading.show();
        let content = prompt("Wpisz treść powiadomienia !");
        if(content !=""){
         axios.post('auth/notifications',{content:content,grade_id:this.grade.id}).then((response)=>{
            axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
             this.grade = response.data.data;
           });
           alert(response.data.message);
           loader.hide();
         });
        }
    },
    updateGrade(){
      const loader = this.$loading.show();
      axios.patch('auth/grades/'+this.grade.id,{name:this.grade.name,color:"#fffff"}).then((response)=>{
          this.grade.name = "";
           axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
            this.grade = response.data.data;
           });
          this.$store.dispatch('grades');
          this.$refs.updateGrade.hide();
          loader.hide();
      });
    },
    deleteMail(mail){
        axios.delete('auth/mails/'+mail.id).then((response)=>{
           axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
            this.grade = response.data.data;
           });
        });
    },
    createMail(){
      axios.post('auth/mails',{name:this.mail.name,email:this.mail.email,grade_id:this.grade.id}).then((response)=>{
        this.mail.name = "";
        this.mail.email = "";
         axios.get('auth/grades/'+this.$route.params.grade).then((response)=>{
            this.grade = response.data.data;
         });
        alert(response.data.message);
        this.$refs.createMail.hide();
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
