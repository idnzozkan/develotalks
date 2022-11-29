import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Fragment from 'vue-fragment'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faComment,
  faCog,
  faPlusCircle,
  faEye,
  faInfoCircle,
  faUserFriends,
  faGlobe,
  faSearch,
  faMicrophone,
  faVideo,
  faShareSquare,
  faDoorOpen,
  faExpand,
  faUsers,
  faComments,
  faPhoneSlash,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { faBell, faSmile } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueNumberInput from '@chenfengyuan/vue-number-input'

library.add(
  faHome,
  faComment,
  faCog,
  faPlusCircle,
  faEye,
  faInfoCircle,
  faUserFriends,
  faGlobe,
  faSearch,
  faBell,
  faMicrophone,
  faVideo,
  faShareSquare,
  faDoorOpen,
  faExpand,
  faUsers,
  faComments,
  faPhoneSlash,
  faSmile,
  faEdit
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)
Vue.component('vue-number-input', VueNumberInput)

Vue.use(Fragment.Plugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
