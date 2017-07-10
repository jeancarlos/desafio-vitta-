<template>
  <div class="tarefas">
    <md-toolbar>
      <md-button class="md-icon-button" @click="abrefecharSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">{{ titulo }}</h2>

      <router-link tag="md-button" class="md-icon-button" to="/busca">
        <md-icon>search</md-icon>
      </router-link>

      <div class="estados-select">
        <md-theme md-name="red">
          <md-select name="" v-model="estados">
            <md-option value="tudo">Tudo</md-option>
            <md-option value="completas">Completas</md-option>
            <md-option value="naofeitas">Por Fazer</md-option>
          </md-select>
        </md-theme>
      </div>
    </md-toolbar>

    <div v-if="tarefas.length > 0">
    <md-theme md-name="red">
      <md-list class="md-double-line">
        <md-list-item v-for="(value,key) in tarefas">
          <md-checkbox class="md-primary md-list-action" v-on:change="atualizarTarefa(!value.completo, value)" v-model="value.completo"></md-checkbox>

          <div class="md-list-text-container">
            <span>{{ value.descricao }}</span>
            <span>{{ value.ocorrencia | dataStr }}</span>
          </div>

          <!-- <div class="tags-listado">
            <md-chips class="" v-model="tagPadrao" md-static></md-chips>
          </div> -->

          <md-button class="md-icon-button md-list-action" @click="removerTarefa(value['.key'])">
            <md-icon>delete_forever</md-icon>
          </md-button>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>
    </md-theme>
    </div>
    <md-layout md-column md-gutter class="estado-vazio-tarefas" v-else>
        <md-layout md-flex=1>
        <md-icon>event_available</md-icon>
      </md-layout>
    </md-layout>

    <md-button class="md-fab md-fab-bottom-right" id="fab" @click="abreDialog('crianota')">
      <md-icon>add</md-icon>
    </md-button>

    <md-sidenav class="md-left" ref="sidenav">
      <md-theme md-name="red">
        <md-toolbar class="md-account-header">
          <md-avatar class="md-large">
            <img :src="user.photoURL" alt="People">
          </md-avatar>

          <div class="md-list-text-container user-cred">
            <span>{{ user.displayName }}</span>
            <span>{{ user.email }}</span>
          </div>

          <md-button  class="md-icon-button md-list-action" @click="sairDoDesafio()">
            <md-icon>cancel</md-icon>
          </md-button>
        </md-toolbar>

      </md-theme>

      <!-- <md-list>
        <md-list-item @click="$refs.sidenav.toggle()">
          <md-icon>delete</md-icon> <span>Trash</span>
        </md-list-item>
      </md-list> -->
    </md-sidenav>

    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="crianota">
      <md-dialog-title>Criar nova tarefa</md-dialog-title>

      <md-dialog-content>
        <md-theme md-name="red">
          <md-input-container>
            <label>Descrição</label>
            <md-input v-model="novaTarefa.descricao" required></md-input>
          </md-input-container>

          <!-- <md-chips v-model="tagPadrao" md-input-placeholder="Tags"></md-chips> -->

          <md-input-container>
            <label>Data e Hora da ocorrencia</label>
            <md-input v-model="novaTarefa.ocorrencia" required placeholder="DD/MM/YYYY HH:MM" v-mask="'##/##/#### ##:##'"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Duraçao</label>
            <md-select v-model="novaTarefa.duracao">
              <md-option value="0">Não</md-option>
              <md-option value="600000">10 minutos</md-option>
              <md-option value="1800000">30 minutos</md-option>
              <md-option value="3600000">1 hora</md-option>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label>Notificar?</label>
            <md-select v-model="novaTarefa.notificar">
              <md-option value="0">Não</md-option>
              <md-option value="600000">10 minutos antes</md-option>
              <md-option value="1800000">30 minutos antes</md-option>
              <md-option value="3600000">1 hora antes</md-option>
            </md-select>
          </md-input-container>
        </md-theme>
        
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="fechaDialog('crianota'), limpaNovaTarefa()">Cancelar</md-button>
        <md-button class="md-primary" @click="fechaDialog('crianota'), adionaTarefa()">Criar</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
export default {
  name: 'tarefas',
  data () {
    return {
      titulo: 'Tarefas',
      estados: 'completas',
      tagPadrao: [],
      tags: [],
      tarefas: this.$parent.tarefas,
      user: this.$parent.user,
      novaTarefa: {
        descricao: '',
        notificar: '0',
        duracao: '0',
        criacao: '0',
        completo: false,
        ocorrencia: ''
      }
    }
  },
  methods: {
    abrefecharSidenav () {
      this.$refs.sidenav.toggle()
    },
    abreDialog (ref) {
      this.$refs[ref].open()
    },
    fechaDialog (ref) {
      this.$refs[ref].close()
    },
    limpaNovaTarefa: function () {
      // Limpa objeto
      this.novaTarefa = {
        descricao: '',
        notificar: '0',
        duracao: '0',
        criacao: '0',
        completo: false,
        ocorrencia: ''
      }
    },
    adionaTarefa: function () {
      /*
        Prefiro guardar data e hora com unixtime pois é mais facil
        de acrecentas e diminuir e só convetendo de volta depois usando Date()
      */
      var dataAgora = new Date()
      this.novaTarefa.criacao = dataAgora.getTime()

      // Não tive tempo de fazer a validacao de tempo, então estou forçando um valor se não preencher
      if (this.novaTarefa.ocorrencia === '') {
        // Data e Hora atual + 1 hora
        this.novaTarefa.ocorrencia = Number(dataAgora.getTime()) + 3600000
      } else {
        var oc = this.novaTarefa.ocorrencia.split(/[ /:]/)
        oc = new Date(oc[2], oc[1] - 1, oc[0], oc[3], oc[4])
        this.novaTarefa.ocorrencia = oc.getTime()
      }

      if (this.novaTarefa.notificar > 0) {
        this.novaTarefa.notificar = Number(this.novaTarefa.ocorrencia + this.novaTarefa.notificar)
      }

      if (this.novaTarefa.descricao === '') {
        // tarefa sem descrição forca um nome generico
        this.novaTarefa.descricao = 'Tarefa'
      }

      this.$parent.$options.firebase.tarefas.push(this.novaTarefa)

      this.limpaNovaTarefa()
    },
    removerTarefa: function (id) {
      this.$parent.$options.firebase.tarefas.child(id).remove()
    },
    atualizarTarefa: function (v, obj) {
      var key = obj['.key']
      var copia = Object.assign({}, obj)
      copia.completo = v
      delete copia['.key']

      this.$parent.$options.firebase.tarefas.child(key).set(copia)
    },
    sairDoDesafio: function () {
      this.$parent.$options.methods.sairDoDesafio()
    }
  },
  filters: {
    dataStr: function (date) {
      function az (v) { // Adiciona Zero pra menor que 10
        return (v > 9 ? v : '0'.concat(v))
      }
      var dataobj = new Date(date)
      var dataStr = az(dataobj.getDay()) +
      '/' + az(dataobj.getMonth()) +
      '/' + az(dataobj.getFullYear()) +
      ' ' + az(dataobj.getDay()) + ':' +
        az(dataobj.getDay())
      return dataStr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-cred{
  margin-left:10px;
}

.md-toolbar.md-theme-default {
  -webkit-box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
  -moz-box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
  box-shadow: 0px -12px 40px 16px rgba(173,173,173,1);
  z-index:1;
}

.md-toolbar .md-input-container label {
  top:0;
}
.md-toolbar .md-input-container.md-has-value label {
  top:-10px;
}

.estados-select{
  margin:0 10px 0 5px;
}

.md-toolbar .md-select {
  flex:1 1 1;
}

.tags-listado{
  flex:1 1 1;
}

.tags-listado .md-chip {
  height:20px;
  padding:2px 5px;
}

.estado-vazio-tarefas .md-icon{
  margin-top:10%;
  font-size:150px;
  padding:50px;
  color:#fff;
  text-align:center;
  width:auto;
  height:auto;
  background:rgba(0,0,0,.2);
  -webkit-border-radius: 300px;
  -moz-border-radius: 300px;
  border-radius: 300px;
}
</style>
