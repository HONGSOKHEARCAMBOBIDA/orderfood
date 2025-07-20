import { createRouter, createWebHistory } from 'vue-router'
import OrderScreen from '../pages/OrderScreen.vue'

const routes = [
  { path: '/order/:tableId', component: OrderScreen },
]

export default createRouter({
  history: createWebHistory('/orderfood/'),  // 👈 add the base path here
  routes,
})
