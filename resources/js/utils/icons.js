import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUsers, faBuilding)
Vue.component('font-awesome-icon', FontAwesomeIcon)
