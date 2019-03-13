<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <a
          href="/login"
          target="_blank"
        >
          Zaloguj się
        </a>
      </li>
    <h2>Social Teams</h2>
      <li>
        <a
          href="https://socialteams.pl"
          target="_blank"
        >
          Social Teams
        </a>
      </li>
        <li>
        <a
          href="https://socialler.pl"
          target="_blank"
        >
         Socialler
        </a>
      </li>
       <li>
        <a
          href="https://lookyourfriend.pl"
          target="_blank"
        >
         Lookyourfriend
        </a>
      </li>
       <li>
        <a
          href="https://multinotify.pl"
          target="_blank"
        >
         Multinotify
        </a>
      </li>
       <li>
        <a
          href="https://id.socialler.eu"
          target="_blank"
        >
         Social ID
        </a>
      </li>
    </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Witaj strona główna jeszcze nie gotowa zaloguj się !'
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
