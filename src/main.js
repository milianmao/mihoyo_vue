import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/ant-design-vue.js'
import '@/assets/css/global.css'
import {
	openNotificationWithIcon,
	isEmpty,
	openNotification,
} from '@/utils/global.js'
import store from './store'
import format from '@/utils/format.js'
// 复制到剪贴板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$openNotificationWithIcon = openNotificationWithIcon
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$openNotification = openNotification
Vue.prototype.$format = format
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
