import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import './assets/css/tailwind.css'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api'
import toast from './api/toast.js'
import upload from './api/upload.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

store.commit('initMenuData', router)

router.beforeEach((to, from, next) => {
  
  const token = store.state.token
  console.log('to->', to.path , ',token->', token);
  
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (!checkRouter(to.path)) {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(route => route.path == path).length
  if(hasCheck) {
    return true
  }

  return false
}
app.use(router)
app.use(ElementPlus)
app.use(store)
app.config.globalProperties.$api = api
app.config.globalProperties.$toast = toast
app.config.globalProperties.$upload = upload

app.mount('#app')
