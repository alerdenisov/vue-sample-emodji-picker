// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import clipboards from 'vue-clipboards'
import 'normalize.css'

locale.use(lang)

Vue.use(clipboards) 

import { Row } from 'element-ui'
Vue.use(Row)

import { Col } from 'element-ui'
Vue.use(Col)

import { Button } from 'element-ui'
Vue.use(Button)

import { Input } from 'element-ui'
Vue.use(Input)

import { Autocomplete } from 'element-ui'
Vue.use(Autocomplete)

import { Scrollbar } from 'element-ui'
Vue.use(Scrollbar)

// import { Notification } from 'element-ui'
// Vue.use(Notification)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
