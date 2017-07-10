<template>
  <div class="tarefas">
    <md-toolbar>
      <router-link tag="md-button" class="md-icon-button" to="/">
        <md-icon><i class="material-icons">arrow_back</i></md-icon>
      </router-link>

      <input type="text" class="md-title title-input" style="flex: 1" :value="busca_realizada" placeholder="Buscar por tarefa ou tag">
      <md-icon><i class="material-icons">search</i></md-icon>

    </md-toolbar>


  </div>
</template>

<script>
export default {
  name: 'busca',
  data () {
    return {
      busca_realizada: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-input {
    border-top: none;
    border-left: none;
    border-right: none;
    outline:none;
  }

  .title-input:focus{
    border-bottom-color:#333;
  }

</style>
