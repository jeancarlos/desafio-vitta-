import Vue from 'vue'
import Router from 'vue-router'
import Tarefas from '@/components/Tarefas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tarefas',
      component: Tarefas
    }
  ]
})
