<template>
  <div class="hello">
    <h1>Powiadomienie</h1>
    <p>Witaj {{ $store.state.user.full_name }} !</p>
        <div class='row'>
    <div class='col-md-3'></div>
    <div class='col-md-6'>
    <div class='grades'>
         <div class='grade'>
 {{notification.content}}
    </div>
    <div class='grade delete' @click="Delete()">
      Skasuj
    </div>
     <div class='grade' @click="()=>{ $router.back() }">
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
  name: 'Notification',
  data () {
    return {
      notification: { }
    }
  },
  created(){
     const loader = this.$loading.show();
     axios.get('auth/notifications/'+this.$route.params.notification).then((response)=>{
        this.notification = response.data.data;
        loader.hide();
     });
  },
  methods:{
    logout(){
       this.$store.dispatch('logout');
    },
    Delete(){
        const loader = this.$loading.show();
        axios.delete("auth/notifications/"+this.notification.id).then((response)=>{
               alert(response.data.message);
               loader.hide();
               this.$router.back();
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
</style>
