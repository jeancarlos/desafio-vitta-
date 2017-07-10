import Vue from 'vue'
import Router from 'vue-router'
import Tarefas from '@/components/Tarefas'
import Busca from '@/components/Busca'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tarefas',
      component: Tarefas
    },
    {
      path: '/busca/',
      name: 'Busca',
      component: Busca
    }
  ]
})
