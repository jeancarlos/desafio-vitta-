<template>
  <div id="app">
    <template v-if="!user && !loading">
    <h1 class="md-display-1 introducao">Desafio Vitta!</h1>
    <md-layout md-align="center" md-gutter="16">
      <md-theme md-name="red" md-flex="35">
        <md-button class="md-raised md-primary" @click="entraComGoogle">Entre com sua conta do Google</md-button>
      </md-theme>
    </md-layout>
     
    </template>
    <router-view v-if="user"></router-view>
  </div>
</template>

<script>
let Firebase = require('firebase/app')

require('firebase/auth')
require('firebase/database')

// Dados pra conectar ao firebase
let config = {
  apiKey: 'AIzaSyChLky1Np0wuuoL4cvscgUa6jbfT1DSEi4',
  authDomain: 'desafio-vitta.firebaseapp.com',
  databaseURL: 'https://desafio-vitta.firebaseio.com',
  projectId: 'desafio-vitta',
  messagingSenderId: '97034851691'
}

let app = Firebase.initializeApp(config)
let db = app.database()

let tarefasRef = db.ref('tarefas')

export default {
  name: 'app',
  beforeCreate: function () {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      }
      this.loading = false
    })
  },
  firebase: {
    tarefas: tarefasRef
  },
  data () {
    return {
      user: null,
      loading: true
    }
  },
  methods: {
    entraComGoogle: function () {
      const provider = new Firebase.auth.GoogleAuthProvider()
      Firebase.auth().signInWithRedirect(provider).then((result) => {
        this.user = result.user
      })
    },
    sairDoDesafio: function () {
      Firebase.auth().signOut().then(() => {
        this.user = null
        window.location.reload()
      })
    }
  }
}
</script>

<style>
#app { 
  /* Adjust font size */
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  /* Smoothing */
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
}
.md-dialog-actions .md-theme-default.md-button:not([disabled]).md-primary:not(.md-icon-button){
  color:#333;
}
.md-dialog .md-theme-default.md-input-container.md-input-focused input,.md-dialog .md-theme-default.md-input-container.md-input-focused textarea {
  margin-bottom:0;
  color:#333;
  outline:none;
}
.md-dialog .md-theme-default.md-input-container.md-input-focused label{
  color:rgba(0, 0, 0, 0.50);
}

.introducao{
  padding:10% 0 20px;
  text-align:center;
}

</style>
