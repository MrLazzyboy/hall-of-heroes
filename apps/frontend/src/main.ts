import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import type {PluginOptions} from "vue-toastification";
import Toast, {POSITION} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import '@/assets/styles/main.scss'
import '@/assets/css/all.min.css'

import vuetify from './plugins/vuetify';
import { isAuthenticated } from '@/services/authService'


const app = createApp(App)

app.use(createPinia())


router.beforeEach(async (to, from, next) => {
  if (to.meta.auth && !isAuthenticated()) {
    next({ name: 'home' })
  } else {
    next()
  }
})


app.use(router)
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2970,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
};
app.use(vuetify);

app.use(Toast, options);
app.mount('#app')
